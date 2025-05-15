// Savollar bazasi
const testQuestions = [
  { question: "Do‘stlaringiz bilan bo‘lishish siz uchun qanchalik muhim?", options: ["A. Juda muhim", "B. O‘rtacha", "C. Kamdan-kam"] },
  { question: "Yangi odamlar bilan tanishish sizga yoqadimi?", options: ["A. Ha, juda yoqadi", "B. Vaziyatga qarab", "C. Unchalik emas"] },
  { question: "Ishni yakunlash siz uchun qanchalik muhim?", options: ["A. Har doim tugataman", "B. Ba'zida tugataman", "C. Ko‘p holatda yarim yo‘lda qoldiraman"] },
  { question: "Stressli vaziyatlarda qanday harakat qilasiz?", options: ["A. Hissiyotimni ifodalayman", "B. Ichimga yutaman", "C. Maslahatlasha boshlayman"] },
  { question: "Yolg‘izlik sizga qanday ta’sir qiladi?", options: ["A. Tinchlik beradi", "B. Ko‘nikkanman", "C. Bezovta qiladi"] },
  { question: "Yangi topshiriqlarni bajarishda siz qanday harakat qilasiz?", options: ["A. Darhol kirishaman", "B. O‘ylab ko‘rib kirishaman", "C. Kechiktiraman"] },
  { question: "Do‘stlaringiz sizni qanday ta’riflaydi?", options: ["A. Ochiq va ijtimoiy", "B. Tinch va xotirjam", "C. Fikrlovchi va mustaqil"] },
  { question: "Muammoga duch kelsangiz, nima qilasiz?", options: ["A. Boshqalardan yordam so‘rayman", "B. Mustaqil hal qilaman", "C. Vaziyatga qarab"] },
  { question: "Dam olish kunlaringizni qanday o‘tkazasiz?", options: ["A. Do‘stlar bilan", "B. Oila davrasida", "C. Yolg‘iz kitob o‘qib"] },
  { question: "O‘zingizga bo‘lgan ishonchingiz qanchalik yuqori?", options: ["A. Yuqori", "B. O‘rtacha", "C. Kam"] },
  { question: "Hayotdagi maqsadingiz aniqmi?", options: ["A. Ha, juda aniq", "B. Taxminan bilaman", "C. Hali aniqlamadim"] },
  { question: "Yutuqlaringizni boshqalar bilan bo‘lishasizmi?", options: ["A. Ha", "B. Ba'zida", "C. Yo‘q"] },
  { question: "Tanqidni qanday qabul qilasiz?", options: ["A. Ijobiy", "B. Xafa bo‘laman", "C. E’tibor bermayman"] },
  { question: "Do‘stlaringiz soni qancha?", options: ["A. Juda ko‘p", "B. O‘rtacha", "C. Kam"] },
  { question: "Yangi ish boshlashdan oldin nima qilasiz?", options: ["A. Rejalashtiraman", "B. Darhol boshlayman", "C. O‘ylab yuraman"] },
  { question: "Stressni qanday yengasiz?", options: ["A. Sport bilan", "B. Suhbat orqali", "C. Yolg‘izlikda"] },
  { question: "Siz uchun muhim narsa nima?", options: ["A. Aloqalar", "B. Xavfsizlik", "C. Mustaqillik"] },
  { question: "Mas'uliyatli vazifalarda o‘zingizni qanday his qilasiz?", options: ["A. Ishonchli", "B. Biroz hayajon", "C. Qiyinchilik bilan"] },
  { question: "Ijtimoiy tadbirlarda siz...", options: ["A. Markazda bo‘laman", "B. Chekkada turaman", "C. Umuman qatnashmayman"] },
  { question: "O‘qish va o‘rganishga bo‘lgan munosabatingiz qanday?", options: ["A. Juda ijobiy", "B. Qiziqishga qarab", "C. Majburiyat sifatida"] },
  { question: "Muammoni boshqalarga aytish sizga osonmi?", options: ["A. Ha", "B. Vaziyatga qarab", "C. Yo‘q"] },
  { question: "O‘zingizni boshqalarga taqqoslaysizmi?", options: ["A. Kamdan-kam", "B. Ba'zida", "C. Tez-tez"] },
  { question: "Maqsad sari harakat qanday bo‘ladi?", options: ["A. Rejali", "B. Har xil", "C. Sekin"] },
  { question: "Ish jarayonida siz...", options: ["A. Hamma bilan ishlay olaman", "B. Tanlanganlar bilan", "C. Yolg‘iz yaxshi ishlayman"] },
  { question: "Qiyin vaziyatda siz...", options: ["A. Hal qilishga urinaman", "B. Qochaman", "C. Boshqalarga yuklayman"] },
  { question: "Sizning hayotiy qadriyatlaringiz...", options: ["A. Aniq va qat'iy", "B. Vaqtga qarab o‘zgaradi", "C. Hali shakllanmagan"] },
  { question: "Tashqi ko‘rinishingiz siz uchun...", options: ["A. Muhim", "B. Ortiqcha", "C. E’tibor bermayman"] },
  { question: "Tuyg‘ularingizni boshqarasizmi?", options: ["A. Ha", "B. Har doim emas", "C. Qiyin"] },
  { question: "Dushmanlik holatida...", options: ["A. Murosaga boraman", "B. Indamayman", "C. Qarshi chiqaman"] },
  { question: "Yangi g‘oyalarga ochiqmisiz?", options: ["A. Ha", "B. O‘ylab ko‘raman", "C. Shubha bilan qarayman"] }
];

// Global o'zgaruvchilar
let currentQuestion = 0;
let userAnswers = [];
let userData = {};

// DOM elementlari
const startBtn = document.getElementById('start-btn');
const userForm = document.getElementById('user-form');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const adminLoginForm = document.getElementById('admin-form');
const logoutBtn = document.getElementById('logout-btn');

const pages = {
  welcome: document.getElementById('welcome-page'),
  userInfo: document.getElementById('user-info-page'),
  test: document.getElementById('test-page'),
  results: document.getElementById('results-page'),
  adminLogin: document.getElementById('admin-login-page'),
  adminPanel: document.getElementById('admin-panel'),
};

// Admin menyu tugmalari
const adminMenuBtns = document.querySelectorAll('.admin-menu-btn');
const adminSections = document.querySelectorAll('.admin-section');

// Firebase init
// (firebaseConfig va database `firebase-config.js` dan yuklanadi)

let database;
document.addEventListener('DOMContentLoaded', () => {
  // Firebase ni initsializatsiya qilish
  database = firebase.database();

  adminAccessControl();
});

// Boshlash tugmasi
startBtn.addEventListener('click', () => {
  pages.welcome.classList.remove('active');
  pages.userInfo.classList.add('active');
});

// Foydalanuvchi ma'lumotlari formasi
userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  userData = {
    name: document.getElementById('name').value.trim(),
    surname: document.getElementById('surname').value.trim(),
    age: Number(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    region: document.getElementById('region').value,
    date: new Date().toISOString(),
  };

  startTest();
});

function startTest() {
  pages.userInfo.classList.remove('active');
  pages.test.classList.add('active');

  userAnswers = new Array(testQuestions.length).fill(null);
  currentQuestion = 0;
  loadQuestion();
  updateNavigationButtons();
  updateSubmitButton();
}

function loadQuestion() {
  const question = testQuestions[currentQuestion];

  document.getElementById('progress-bar').style.width = `${((currentQuestion + 1) / testQuestions.length) * 100}%`;
  document.getElementById('progress-text').textContent = `${currentQuestion + 1}/${testQuestions.length}`;

  document.getElementById('question-text').textContent = question.question;

  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';

    if (userAnswers[currentQuestion] === option[0]) {
      optionElement.classList.add('selected');
    }

    optionElement.innerHTML = `
      <input type="radio" name="option" id="option-${index}" value="${option[0]}" />
      <label for="option-${index}">${option}</label>
    `;

    optionElement.addEventListener('click', () => {
      document.querySelectorAll('.option').forEach((opt) => opt.classList.remove('selected'));
      optionElement.classList.add('selected');

      userAnswers[currentQuestion] = option[0];
      updateSubmitButton();
    });

    optionsContainer.appendChild(optionElement);
  });
}

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
    updateNavigationButtons();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion < testQuestions.length - 1) {
    currentQuestion++;
    loadQuestion();
    updateNavigationButtons();
  }
});

function updateNavigationButtons() {
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.style.display = currentQuestion === testQuestions.length - 1 ? 'none' : 'block';
}

function updateSubmitButton() {
  if (currentQuestion === testQuestions.length - 1 && userAnswers[currentQuestion] !== null) {
    submitBtn.style.display = 'block';
  } else {
    submitBtn.style.display = 'none';
  }
}

// Testni yakunlash
submitBtn.addEventListener('click', () => {
  if (userAnswers.includes(null)) {
    alert('Iltimos, barcha savollarga javob bering!');
    return;
  }

  const aCount = userAnswers.filter((a) => a === 'A').length;
  const bCount = userAnswers.filter((b) => b === 'B').length;
  const cCount = userAnswers.filter((c) => c === 'C').length;
  const total = aCount + bCount + cCount;

  const aPercent = Math.round((aCount / total) * 100);
  const bPercent = Math.round((bCount / total) * 100);
  const cPercent = Math.round((cCount / total) * 100);

  showResults(aPercent, bPercent, cPercent);
});

// Natijalarni ko‘rsatish
function showResults(aPercent, bPercent, cPercent) {
  pages.test.classList.remove('active');
  pages.results.classList.add('active');

  document.getElementById('result-user-name').textContent = `${userData.name} ${userData.surname}`;
  document.getElementById('result-user-age').textContent = `${userData.age} yosh`;
  document.getElementById('result-user-gender').textContent = userData.gender;
  document.getElementById('result-user-region').textContent = userData.region;

  document.getElementById('a-percent').textContent = `${aPercent}%`;
  document.getElementById('b-percent').textContent = `${bPercent}%`;
  document.getElementById('c-percent').textContent = `${cPercent}%`;

  setTimeout(() => {
    document.getElementById('a-bar').style.width = `${aPercent}%`;
    document.getElementById('b-bar').style.width = `${bPercent}%`;
    document.getElementById('c-bar').style.width = `${cPercent}%`;
  }, 100);

  document.getElementById('a-description').textContent = getDescription('A', aPercent);
  document.getElementById('b-description').textContent = getDescription('B', bPercent);
  document.getElementById('c-description').textContent = getDescription('C', cPercent);

  document.getElementById('result-summary').textContent = getSummary(aPercent, bPercent, cPercent);

  saveResults(aPercent, bPercent, cPercent);
}

function getDescription(type, percent) {
  const descriptions = {
    A: [
      "Siz ijtimoiy va ochiq odamsiz. Do'stlaringiz bilan vaqt o'tkazish siz uchun muhim.",
      "Sizda ijtimoiylik fazilati bor, lekin ba'zida yolg'izlikni ham yaxshi ko'rasiz.",
      "Ijtimoiylik siz uchun unchalik muhim emas. Yolg'iz vaqt siz uchun qimmatli.",
    ],
    B: [
      "Siz muvozanatli va xotirjam odamsiz. Har qanday vaziyatga moslasha olasiz.",
      "Sizda muvozanat bor, lekin ba'zida hissiyotlaringiz ustun keladi.",
      "Siz asosan xotirjam odamsiz, lekin ba'zida muvozanatni saqlash qiyin bo'ladi.",
    ],
    C: [
      "Siz mustaqil va fikrlash qobiliyati yuqori odamsiz. O'z fikrlaringizga amal qilasiz.",
      "Sizda mustaqillik bor, lekin ba'zida boshqalarning fikri ham muhim bo'ladi.",
      "Siz ko'proq mustaqil fikrlash odatiga egasiz. Boshqalarga qaraganda o'z yo'lingizdan borasiz.",
    ],
  };

  if (percent >= 60) return descriptions[type][0];
  if (percent >= 30) return descriptions[type][1];
  return descriptions[type][2];
}

function getSummary(a, b, c) {
  const max = Math.max(a, b, c);

  if (max === a) {
    return "Siz asosan ijtimoiy va ochiq odamsiz. Do'stlaringiz bilan muloqot siz uchun muhim. Siz yangi odamlar bilan tez tanishasiz va jamoada ishlash sizga yoqadi. Sizning asosiy kuchli tomonlaringiz - muloqot qobiliyati va ijtimoiylik.";
  } else if (max === b) {
    return "Siz muvozanatli va xotirjam odamsiz. Har qanday vaziyatga moslasha olasiz. Siz hissiyotlaringizni nazorat qila olasiz va murakkab vaziyatlarda ham sokinligingizni saqlaysiz. Sizning asosiy kuchli tomonlaringiz - bardoshlik va muvozanat.";
  } else {
    return "Siz mustaqil va fikrlash qobiliyati yuqori odamsiz. O'z fikrlaringizga amal qilasiz va boshqalarning fikri siz uchun unchalik muhim emas. Siz yolg'iz ishlashni yaxshi ko'rasiz va muammolarni mustaqil hal qilishga intilasiz. Sizning asosiy kuchli tomonlaringiz - mustaqillik va ijodkorlik.";
  }
}

// Qayta boshlash
restartBtn.addEventListener('click', () => {
  pages.results.classList.remove('active');
  pages.welcome.classList.add('active');
});

// Admin panelga kirish nazorati
function adminAccessControl() {
  // Dastlab admin kirish tugmasi yo'q
  // Admin panelga kirish uchun alohida sahifa
  pages.adminPanel.classList.remove('active');
  pages.adminLogin.classList.remove('active');

  // Admin kirish formasi
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === 'admin123') {
      pages.adminLogin.classList.remove('active');
      pages.adminPanel.classList.add('active');
      loadAdminData();
    } else {
      alert('Noto\'g\'ri foydalanuvchi nomi yoki parol!');
    }
  });

  // Admin logout
  logoutBtn.addEventListener('click', () => {
    pages.adminPanel.classList.remove('active');
    pages.welcome.classList.add('active');
  });
}

// Admin menyusi
adminMenuBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.admin-menu-btn.active').classList.remove('active');
    btn.classList.add('active');

    document.querySelector('.admin-section.active').classList.remove('active');
    const sectionId = btn.dataset.section + '-section';
    document.getElementById(sectionId).classList.add('active');
  });
});

// Firebase dan ma'lumotlarni yuklash
function loadAdminData() {
  const usersRef = database.ref('users');
  const resultsRef = database.ref('results');

  // Umumiy statistika
  usersRef.once('value').then((snapshot) => {
    const users = snapshot.val() || {};
    document.getElementById('total-users-count').textContent = Object.keys(users).length;
  });

  resultsRef.once('value').then((snapshot) => {
    const results = snapshot.val() || {};
    document.getElementById('total-tests-count').textContent = Object.keys(results).length;

    // Hududlar soni (unique)
    const regions = new Set();
    Object.values(results).forEach((res) => {
      if (res.region) regions.add(res.region);
    });
    document.getElementById('total-regions-count').textContent = regions.size;

    populateRecentResults(results);
    populateUsers(users);
    populateResultsTable(results);
    populateRegionFilter(regions);
    populateStatistics(results);
  });
}

// Jadvalga oxirgi test natijalarini qo'shish
function populateRecentResults(results) {
  const tbody = document.querySelector('#recent-results-table tbody');
  tbody.innerHTML = '';

  const sorted = Object.values(results).sort((a, b) => new Date(b.date) - new Date(a.date));
  sorted.slice(0, 10).forEach((res) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${res.name}</td>
      <td>${res.surname}</td>
      <td>${res.age}</td>
      <td>${res.region}</td>
      <td>${res.a}%</td>
      <td>${res.b}%</td>
      <td>${res.c}%</td>
      <td>${new Date(res.date).toLocaleDateString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Foydalanuvchilarni jadvalga qo'shish
function populateUsers(users) {
  const tbody = document.querySelector('#users-table tbody');
  tbody.innerHTML = '';

  Object.entries(users).forEach(([id, user]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${user.name}</td>
      <td>${user.surname}</td>
      <td>${user.age}</td>
      <td>${user.gender}</td>
      <td>${user.region}</td>
      <td>${user.testsCount || 0}</td>
      <td>${user.lastTestDate ? new Date(user.lastTestDate).toLocaleDateString() : ''}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Natijalarni jadvalga qo'shish
function populateResultsTable(results) {
  const tbody = document.querySelector('#results-table tbody');
  tbody.innerHTML = '';

  Object.entries(results).forEach(([id, res]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${res.name} ${res.surname}</td>
      <td>${res.age}</td>
      <td>${res.region}</td>
      <td>${res.a}%</td>
      <td>${res.b}%</td>
      <td>${res.c}%</td>
      <td>${new Date(res.date).toLocaleDateString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Hudud filterini to'ldirish
function populateRegionFilter(regions) {
  const select = document.getElementById('region-filter');
  select.innerHTML = '<option value="">Barchasi</option>';

  [...regions].forEach((region) => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    select.appendChild(option);
  });
}

// Statistika uchun diagrammalar
function populateStatistics(results) {
  const regionsCount = {};
  const agesCount = { '7-12': 0, '13-18': 0, '19-25': 0 };
  const gendersCount = { Erkak: 0, Ayol: 0 };

  Object.values(results).forEach((res) => {
    regionsCount[res.region] = (regionsCount[res.region] || 0) + 1;

    const age = res.age;
    if (age >= 7 && age <= 12) agesCount['7-12']++;
    else if (age >= 13 && age <= 18) agesCount['13-18']++;
    else if (age >= 19 && age <= 25) agesCount['19-25']++;

    if (res.gender === 'Erkak') gendersCount.Erkak++;
    else if (res.gender === 'Ayol') gendersCount.Ayol++;
  });

  // Chart.js diagrammalarini yaratish
  createChart('regions-chart', Object.keys(regionsCount), Object.values(regionsCount), 'Hududlar bo\'yicha testlar soni');
  createChart('ages-chart', Object.keys(agesCount), Object.values(agesCount), 'Yosh guruhlari bo\'yicha testlar soni');
  createChart('genders-chart', Object.keys(gendersCount), Object.values(gendersCount), 'Jinslar bo\'yicha testlar soni');
}

let charts = {};

function createChart(id, labels, data, label) {
  const ctx = document.getElementById(id).getContext('2d');
  if (charts[id]) charts[id].destroy();

  charts[id] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
      }],
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, precision: 0 } },
    },
  });
}

// Natijalarni Firebase-ga saqlash
function saveResults(aPercent, bPercent, cPercent) {
  if (!database) return;

  const userId = userData.name.toLowerCase() + '_' + userData.surname.toLowerCase() + '_' + Date.now();

  const resultData = {
    ...userData,
    a: aPercent,
    b: bPercent,
    c: cPercent,
  };

  const updates = {};

  updates[`results/${userId}`] = { ...resultData, date: userData.date };
  updates[`users/${userId}`] = {
    ...userData,
    testsCount: (userData.testsCount || 0) + 1,
    lastTestDate: userData.date,
  };

  database.ref().update(updates).then(() => {
    console.log('Natijalar Firebase-ga saqlandi');
  }).catch((error) => {
    console.error('Xato:', error);
  });
}
