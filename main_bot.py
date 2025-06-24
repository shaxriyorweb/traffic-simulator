import os
import logging
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, types
from aiogram.contrib.middlewares.logging import LoggingMiddleware
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.utils import executor
from aiogram.types import (
    ReplyKeyboardMarkup,
    KeyboardButton,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    Location
)

# ... oldingi importlar ...

# Konfiguratsiyani yuklash
load_dotenv()
TOKEN = os.getenv('8199956612:AAHReVN0_hFyFSnHaCaJwP7T_S7_lY2ltRI')

# Logging sozlamalari
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Botni ishga tushirish
bot = Bot(token=TOKEN)
dp = Dispatcher(bot)
dp.middleware.setup(LoggingMiddleware())

# ... oldingi sozlamalar ...

# ====================== YANGI GPS FUNKSIYALARI ======================

def get_main_menu():
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True, row_width=2)
    keyboard.add(
        KeyboardButton("🆘 Favqulodda holat"),
        KeyboardButton("📍 Joylashuvni yuborish", request_location=True)
    )
    keyboard.add(
        KeyboardButton("📞 Tez yordam raqamlari"),
        KeyboardButton("👥 Qo'shnilar bilan bog'lanish")
    )
    keyboard.add(
        KeyboardButton("📝 Profilni to'ldirish")
    )
    return keyboard

@dp.message_handler(content_types=['location'])
async def handle_location(message: types.Message):
    user_id = message.from_user.id
    latitude = message.location.latitude
    longitude = message.location.longitude
    
    # Joylashuvni bazaga saqlash
    if user_id in users_db:
        users_db[user_id]['location'] = {
            'latitude': latitude,
            'longitude': longitude
        }
    
    # Google Maps havolasi
    maps_url = f"https://www.google.com/maps?q={latitude},{longitude}"
    
    await message.reply(
        f"📍 Joylashuvingiz qabul qilindi!\n"
        f"Xaritada ko'rish: {maps_url}",
        reply_markup=get_main_menu()
    )

# Favqulodda holatda joylashuvni so'rash
async def ask_for_location(user_id):
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True)
    keyboard.add(
        KeyboardButton("📍 Joylashuvni yuborish", request_location=True),
        KeyboardButton("❌ Bekor qilish")
    )
    
    await bot.send_message(
        user_id,
        "Iltimos, favqulodda holat joylashuvini yuboring:",
        reply_markup=keyboard
    )

# ... oldingi kodlar ...

@dp.callback_query_handler(lambda call: call.data == "confirm_emergency")
async def confirm_emergency(call: types.CallbackQuery, state: FSMContext):
    user_data = await state.get_data()
    emergency_type = user_data['emergency_type']
    user_id = call.from_user.id
    user_info = users_db.get(user_id, {})
    
    # Agar joylashuv mavjud bo'lsa, xabarga qo'shish
    location_text = ""
    if 'location' in user_info:
        lat = user_info['location']['latitude']
        lon = user_info['location']['longitude']
        location_text = f"🗺️ Joylashuv: https://www.google.com/maps?q={lat},{lon}\n"
    
    alert_message = (
        f"🚨 **Favqulodda holat!**\n"
        f"🔹 **Turi:** {emergency_types[emergency_type]}\n"
        f"👤 **Kimdan:** {user_info['name']}\n"
        f"📞 **Telefon:** {user_info['phone']}\n"
        f"🏠 **Manzil:** {user_info['address']}\n"
        f"{location_text}"
        f"⏰ **Vaqt:** {call.message.date}"
    )
    
    # Adminlarga xabar yuborish
    for admin_id in admins:
        try:
            await bot.send_message(admin_id, alert_message)
            # Agar joylashuv mavjud bo'lsa, xaritani ham yuborish
            if 'location' in user_info:
                await bot.send_location(
                    admin_id,
                    latitude=user_info['location']['latitude'],
                    longitude=user_info['location']['longitude']
                )
        except Exception as e:
            logger.error(f"Adminga xabar yuborishda xato: {e}")
    
    await call.message.edit_text(
        "✅ **Xabaringiz mahalla adminlariga yuborildi!**\n"
        "Agar tez yordam kerak bo'lsa, quyidagi raqamlarga murojaat qiling:",
        reply_markup=get_main_menu()
    )
    await state.finish()

# ... qolgan kodlar ...

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
