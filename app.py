import streamlit as st
import hashlib
import networkx as nx
import matplotlib.pyplot as plt
import plotly.graph_objs as go

# --- Sahifa nomi ---
st.title("WiMAX texnologiyasi va tarmoq protokollari tahlili")

# --- Kirish: WiMAX haqida umumiy ma'lumot ---
st.header("WiMAX haqida umumiy ma'lumot")
st.write("""
WiMAX — keng polosali simsiz tarmoq texnologiyasi bo‘lib, 
u katta masofaga yuqori tezlikda internet ulanishini ta’minlaydi. 
WiMAX standartlari IEEE 802.16 asosida ishlaydi.
""")

# --- Tarmoq topologiyasi tanlash ---
st.header("Tarmoq topologiyasini tanlash")
topology = st.selectbox("Topologiya turlari:", ["Point-to-Multipoint (PMP)", "Mesh", "Relay"])

# --- Tarmoq tugun parametrlarini sozlash ---
st.header("Tarmoq tugun parametrlarini sozlash")
distance = st.slider("Masofa (metr):", 10, 1000, 100)
signal_strength = st.slider("Signal kuchi (dBm):", -100, 0, -50)
channel_type = st.selectbox("Kanal turi:", ["2.4 GHz", "5 GHz", "60 GHz"])

# --- Tarmoq grafini chizish ---
G = nx.Graph()

if topology == "Point-to-Multipoint (PMP)":
    G.add_node("Base Station")
    for i in range(1, 5):
        G.add_node(f"Subscriber {i}")
        G.add_edge("Base Station", f"Subscriber {i}")
elif topology == "Mesh":
    nodes = [f"Node {i}" for i in range(1,5)]
    G.add_nodes_from(nodes)
    edges = [("Node 1", "Node 2"), ("Node 2", "Node 3"), ("Node 3", "Node 4"),
             ("Node 4", "Node 1"), ("Node 1", "Node 3")]
    G.add_edges_from(edges)
elif topology == "Relay":
    G.add_nodes_from(["Base Station", "Relay", "Subscriber"])
    G.add_edges_from([("Base Station", "Relay"), ("Relay", "Subscriber")])

fig, ax = plt.subplots()
nx.draw(G, with_labels=True, node_color='lightgreen', node_size=2000, ax=ax)
st.pyplot(fig)

# --- O'tkazuvchanlik va kechikishni hisoblash ---
def throughput(signal_strength, distance):
    base_rate = 100  # Mbps
    loss = (distance / 100) * 2
    rate = base_rate - loss - abs(signal_strength)/2
    return max(rate, 0)

def latency(distance):
    speed_of_light = 3e8
    delay = (distance / speed_of_light) * 1000 * 2
    processing_delay = 10
    return delay + processing_delay

thr = throughput(signal_strength, distance)
lat = latency(distance)

st.subheader("Tarmoq tahlili natijalari")
st.write(f"O'tkazuvchanlik: {thr:.2f} Mbps")
st.write(f"Kechikish: {lat:.2f} ms")

# --- Protokollar va IPSec autentifikatsiyasi ---
st.header("Tarmoq protokollari va IPSec autentifikatsiyasi")

protocol = st.selectbox("Protokol tanlang:", ["TCP", "UDP", "HTTP", "DNS", "IPSec"])

protocol_info = {
    "TCP": "TCP - ishonchli transport qatlam protokoli.",
    "UDP": "UDP - tezkor, lekin ishonchsiz transport protokoli.",
    "HTTP": "HTTP - veb sahifalar uchun so‘rov va javob protokoli.",
    "DNS": "DNS - domen nomlarini IP manzillarga o‘giruvchi protokol.",
    "IPSec": "IPSec - xavfsizlik uchun autentifikatsiya va shifrlash protokoli."
}
st.info(protocol_info[protocol])

if protocol == "IPSec":
    auth_method = st.radio(
        "Autentifikatsiya usulini tanlang:",
        ("Pre-Shared Key (PSK)", "Digital Certificates (PKI)", "RSA Signatures", "EAP Authentication")
    )

    if auth_method == "Pre-Shared Key (PSK)":
        key = st.text_input("Oldindan uzatilgan maxfiy kalit:", type="password")
        if st.button("Kalitni hash qilish"):
            if key.strip() == "":
                st.error("Kalitni kiriting!")
            else:
                hashed = hashlib.sha256(key.encode()).hexdigest()
                st.success("Kalit hashlandi!")
                st.code(hashed)
    else:
        st.write(f"{auth_method} haqida qisqacha ma'lumot:")
        desc = {
            "Digital Certificates (PKI)":"PKI raqamli sertifikatlar orqali autentifikatsiya.",
            "RSA Signatures":"RSA raqamli imzolar yordamida autentifikatsiya.",
            "EAP Authentication":"EAP kengaytirilgan autentifikatsiya protokoli."
        }
        st.write(desc[auth_method])

# --- Solishtirish uchun grafik (plotly) ---
st.header("Topologiyalar bo‘yicha o'tkazuvchanlik va kechikish solishtiruvi")

x = ["PMP", "Mesh", "Relay"]
thr_values = [throughput(signal_strength, 100), throughput(signal_strength, 150), throughput(signal_strength, 200)]
lat_values = [latency(100), latency(150), latency(200)]

fig2 = go.Figure()
fig2.add_trace(go.Bar(name='Oʻtkazuvchanlik (Mbps)', x=x, y=thr_values))
fig2.add_trace(go.Bar(name='Kechikish (ms)', x=x, y=lat_values))
fig2.update_layout(barmode='group', title='Topologiyalar solishtiruvi')
st.plotly_chart(fig2)

# --- Yakuniy yozuv ---
st.markdown("---")
st.write("Ushbu ilova WiMAX tarmog‘i texnologiyasi, protokollar va autentifikatsiya usullarini o‘rganish uchun mo‘ljallangan.")
