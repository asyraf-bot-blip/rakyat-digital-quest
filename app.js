// ==========================================
// 1. SISTEM KESAN BUNYI (WEB AUDIO API)
// ==========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function mainkanBunyi(jenis) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const masaSemasa = audioCtx.currentTime;

    if (jenis === 'klik') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, masaSemasa);
        osc.frequency.exponentialRampToValueAtTime(800, masaSemasa + 0.04);
        gain.gain.setValueAtTime(0.15, masaSemasa);
        gain.gain.linearRampToValueAtTime(0.01, masaSemasa + 0.04);
        osc.start(masaSemasa);
        osc.stop(masaSemasa + 0.04);

    } else if (jenis === 'betul') {
        [523.25, 783.99].forEach((frek, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            const waktuMula = masaSemasa + (i * 0.1);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(frek, waktuMula);
            gain.gain.setValueAtTime(0.2, waktuMula);
            gain.gain.linearRampToValueAtTime(0.01, waktuMula + 0.18);
            osc.start(waktuMula);
            osc.stop(waktuMula + 0.18);
        });

    } else if (jenis === 'salah') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, masaSemasa);
        osc.frequency.linearRampToValueAtTime(100, masaSemasa + 0.28);
        gain.gain.setValueAtTime(0.2, masaSemasa);
        gain.gain.linearRampToValueAtTime(0.01, masaSemasa + 0.28);
        osc.start(masaSemasa);
        osc.stop(masaSemasa + 0.28);

    } else if (jenis === 'kemenangan') {
        [523.25, 659.25, 783.99, 1046.50].forEach((frek, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            const waktuMula = masaSemasa + (i * 0.12);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(frek, waktuMula);
            gain.gain.setValueAtTime(0.22, waktuMula);
            gain.gain.linearRampToValueAtTime(0.01, waktuMula + 0.22);
            osc.start(waktuMula);
            osc.stop(waktuMula + 0.22);
        });

    } else if (jenis === 'kalah') {
        [300, 240, 180, 120].forEach((frek, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            const waktuMula = masaSemasa + (i * 0.15);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(frek, waktuMula);
            gain.gain.setValueAtTime(0.2, waktuMula);
            gain.gain.linearRampToValueAtTime(0.01, waktuMula + 0.2);
            osc.start(waktuMula);
            osc.stop(waktuMula + 0.2);
        });
    }
}

// ==========================================
// 2. PENGURUSAN DARK / LIGHT MODE
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeUI(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    mainkanBunyi('klik');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
});

function updateThemeUI(theme) {
    if (theme === 'dark') {
        themeIcon.innerText = '☀️';
        themeText.innerText = 'Cerah';
    } else {
        themeIcon.innerText = '🌙';
        themeText.innerText = 'Gelap';
    }
}

// ==========================================
// 3. DATA SOALAN & TIPS MASKOT
// ==========================================
const senaraiSoalan = [
    {
        kategori: "🏦 Perbankan & Kewangan",
        soalan: "1. Pihak bank boleh meminta nombor OTP atau TAC anda melalui panggilan telefon.",
        jawapan: false,
        penjelasan: "Pihak bank tidak akan sesekali meminta kod OTP atau TAC anda.",
        tip: "Kakitangan rasmi bank TIDAK PERNAH meminta kod OTP daripada pelanggan!"
    },
    {
        kategori: "🔐 Keselamatan Akaun",
        soalan: "2. Kata laluan yang kuat harus menggabungkan huruf besar, huruf kecil, nombor, dan simbol.",
        jawapan: true,
        penjelasan: "Gabungan pelbagai aksara menyukarkan percubaan godaman brute-force.",
        tip: "Gunakan frasa laluan (passphrase) yang panjang sekurang-kurangnya 12 aksara."
    },
    {
        kategori: "🎣 Pancingan Data (Phishing)",
        soalan: "3. Mengklik pautan mencurigakan melalui SMS mengenai bantuan kewangan segera adalah selamat.",
        jawapan: false,
        penjelasan: "Pautan seperti ini lazimnya taktik phishing untuk mencuri maklumat log masuk.",
        tip: "Semak URL dengan teliti sebelum klik mana-mana pautan pesanan ringkas."
    },
    {
        kategori: "🛡️ Perlindungan Identiti",
        soalan: "4. Pengesahan dua faktor (2FA) menambah lapisan keselamatan kedua pada akaun anda.",
        jawapan: true,
        penjelasan: "2FA melindungi akaun anda walaupun kata laluan anda telah terbocor.",
        tip: "Aktifkan aplikasi Google Authenticator untuk keselamatan maksimum."
    },
    {
        kategori: "🌐 Rangkaian & Wi-Fi",
        soalan: "5. Melakukan transaksi perbankan dalam talian menggunakan Wi-Fi awam percuma adalah selamat.",
        jawapan: false,
        penjelasan: "Wi-Fi awam berisiko diserang pintasan data (Man-in-the-Middle attack).",
        tip: "Gunakan kuota data selular peribadi apabila mengakses akaun bank."
    },
    {
        kategori: "💻 Sistem & Perisian",
        soalan: "6. Mengemas kini sistem operasi dan aplikasi secara berkala membantu menampal kelemahan keselamatan.",
        jawapan: true,
        penjelasan: "Kemas kini keselamatan menampal celah kerentanan daripada dieksploitasi penggodam.",
        tip: "Jangan abaikan notifikasi pembaruan 'Security Update' pada telefon pintar."
    },
    {
        kategori: "📞 Penipuan Panggilan (Scam)",
        soalan: "7. Polis atau mahkamah boleh memindahkan panggilan anda terus ke agensi lain untuk menyelesaikan siasatan kes.",
        jawapan: false,
        penjelasan: "Ini taktik Macau Scam. Agensi kerajaan tidak memindahkan panggilan siasatan melalui telefon.",
        tip: "Letakkan panggilan jika pemanggil mendakwa dari mahkamah atau balai polis secara mengejut!"
    },
    {
        kategori: "📱 Perisian Hasad (Malware)",
        soalan: "8. Anda disarankan memuat turun fail APK aplikasi dari sumber luar atau kumpulan Telegram.",
        jawapan: false,
        penjelasan: "Fail APK luar kerap mengandungi malware pengintip SMS perbankan.",
        tip: "Hanya muat turun aplikasi dari Google Play Store atau Apple App Store sahaja."
    },
    {
        kategori: "🔒 Keselamatan Pelayaran",
        soalan: "9. Simbol mangga berkunci dan protokol 'https://' membuktikan sambungan laman web disulitkan.",
        jawapan: true,
        penjelasan: "'https://' menyulitkan penghantaran data antara pelayar dan laman web.",
        tip: "Pastikan ejaan URL adalah rasmi dan bukannya laman tiruan (cth: maybank2u.com)."
    },
    {
        kategori: "💾 Sandaran Data (Backup)",
        soalan: "10. Membuat salinan sandaran (backup) fail penting secara berkala melindungi anda daripada ancaman ransomware.",
        jawapan: true,
        penjelasan: "Salinan sandaran membolehkan pemulihan fail tanpa perlu membayar tebusan.",
        tip: "Amalkan kaedah sandaran 3-2-1 untuk data berharga anda."
    },
    {
        kategori: "🪪 Privasi Data Peribadi",
        soalan: "11. Berkongsi gambar MyKad secara terbuka di media sosial tidak membahayakan privasi anda.",
        jawapan: false,
        penjelasan: "Data MyKad boleh disalahgunakan untuk pinjaman haram atau kecurian identiti.",
        tip: "Palangkan gambar MyKad dengan tulisan 'UNTUK KEGUNAAN X SAHAJA' jika perlu dihantar."
    },
    {
        kategori: "🚨 Semakan Sah PDRM",
        soalan: "12. Anda boleh menyemak akaun bank atau nombor telefon scammer melalui portal Semak Mule PDRM.",
        jawapan: true,
        penjelasan: "Portal Semak Mule membantu mengenal pasti akaun keldai (mule account) berdaftar.",
        tip: "Layari semakmule.rmp.gov.my sebelum memindahkan wang kepada pihak tidak dikenali."
    },
    {
        kategori: "🔐 Amalan Kata Laluan",
        soalan: "13. Menggunakan satu kata laluan yang sama untuk semua akaun e-mel dan bank adalah langkah yang disyorkan.",
        jawapan: false,
        penjelasan: "Jika satu akaun ditembusi, kesemua akaun anda yang lain turut berisiko.",
        tip: "Gunakan aplikasi Pengurus Kata Laluan (Password Manager) yang dipercayai."
    },
    {
        kategori: "📷 Kod QR (Quishing)",
        soalan: "14. Mengimbas kod QR di tempat awam tanpa memeriksa sumbernya berisiko membuka pautan palsu yang berbahaya.",
        jawapan: true,
        penjelasan: "Quishing menggunakan pelekat QR palsu untuk memperdaya mangsa ke portal pancingan data.",
        tip: "Periksa sama ada pelekat QR itu bertindih di atas kod asal kedai."
    },
    {
        kategori: "🖥️ Keselamatan Komputer Awam",
        soalan: "15. Menekan 'Log Keluar' selepas menggunakan komputer di perpustakaan atau kafe siber adalah wajib.",
        jawapan: true,
        penjelasan: "Log keluar menghentikan sesi aktif agar pengguna seterusnya tidak menceroboh akaun anda.",
        tip: "Sentiasa padamkan sejarah pelayaran (browsing history) pada komputer awam."
    }
];

const dialogCeria = [
    "Wah, tepat sekali! Pengetahuan siber anda mantap! 🚀",
    "Bagus! Penggodam pasti kecewa dengan anda! 😎",
    "Bijak! Teruskan konsistensi begini! ✨",
    "Hebat! Satu lagi ancaman berjaya dielakkan! 🛡️"
];

const dialogSalah = [
    "Aduh, perisai terjejas! Berhati-hati dengan muslihat scammer! ⚠️",
    "Kurang tepat! Jangan risau, kita belajar daripada kesilapan. 💪",
    "Awas! Satu nyawa hilang, perketatkan kawalan siber anda! 💔"
];

// ==========================================
// 4. LOGIK PERMAINAN & INTERAKSI MASKOT
// ==========================================
const butangMula = document.getElementById('butang-mula');
const teksSoalan = document.getElementById('soalan');
const teksMarkah = document.getElementById('markah');
const teksMaklumBalas = document.getElementById('maklum-balas');
const pilihanJawapan = document.getElementById('pilihan-jawapan');
const butangBetul = document.getElementById('butang-betul');
const butangSalah = document.getElementById('butang-salah');

const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');
const progressBarFill = document.getElementById('progress-bar-fill');

const nyawaDisplay = document.getElementById('nyawa-display');
const streakBox = document.getElementById('streak-box');
const streakText = document.getElementById('streak-text');
const kategoriTag = document.getElementById('kategori-tag');
const kategoriText = document.getElementById('kategori-text');

const ruangLencana = document.getElementById('ruang-lencana');
const ikonLencana = document.getElementById('ikon-lencana');
const namaLencana = document.getElementById('nama-lencana');
const huraianLencana = document.getElementById('huraian-lencana');

// Elemen Sisi
const mascotAvatar = document.getElementById('mascot-avatar');
const mascotDialog = document.getElementById('mascot-dialog');
const botMouth = document.getElementById('bot-mouth');
const shieldMeterBar = document.getElementById('shield-meter-bar');
const shieldStatusText = document.getElementById('shield-status-text');
const quickTipText = document.getElementById('quick-tip-text');

let mataGanjaran = 0;
let indeksSoalan = 0;
let nyawa = 3;
let streak = 0;

// Fungsi Menukar Ekspresi Robot (Gembira / Nangis / Biasa)
function tukarEmosiRobot(keadaan) {
    mascotAvatar.classList.remove('gembira', 'nangis');

    if (keadaan === 'gembira') {
        mascotAvatar.classList.add('gembira');
        botMouth.setAttribute('d', 'M 54 70 Q 70 88 86 70');
        botMouth.setAttribute('stroke', '#34d399');
        botMouth.setAttribute('stroke-width', '4');

        setTimeout(() => {
            tukarEmosiRobot('biasa');
        }, 1400);

    } else if (keadaan === 'nangis') {
        mascotAvatar.classList.add('nangis');
        botMouth.setAttribute('d', 'M 54 80 Q 70 68 86 80');
        botMouth.setAttribute('stroke', '#f87171');
        botMouth.setAttribute('stroke-width', '4');

        setTimeout(() => {
            tukarEmosiRobot('biasa');
        }, 1400);

    } else {
        mascotAvatar.classList.remove('gembira', 'nangis');
        botMouth.setAttribute('d', 'M 58 75 Q 70 82 82 75');
        botMouth.setAttribute('stroke', '#10b981');
        botMouth.setAttribute('stroke-width', '3');
    }
}

function mulaPermainan() {
    mainkanBunyi('klik');
    mataGanjaran = 0;
    indeksSoalan = 0;
    nyawa = 3;
    streak = 0;

    teksMarkah.innerText = mataGanjaran;
    teksMaklumBalas.innerText = "";
    ruangLencana.className = "tersembunyi";
    ruangLencana.classList.remove('game-over-style');

    kemaskiniNyawaUI();
    kemaskiniPerisaiUI();
    streakBox.classList.add('tersembunyi');

    butangMula.classList.add('tersembunyi');
    pilihanJawapan.classList.remove('tersembunyi');
    kategoriTag.classList.remove('tersembunyi');

    mascotDialog.innerHTML = `"Misi bermula! Berikan jawapan terbaik anda." 🎯`;

    paparSoalan();
}

function kemaskiniNyawaUI() {
    if (nyawa === 3) {
        nyawaDisplay.innerText = "❤️❤️❤️";
    } else if (nyawa === 2) {
        nyawaDisplay.innerText = "❤️❤️🖤";
    } else if (nyawa === 1) {
        nyawaDisplay.innerText = "❤️🖤🖤";
    } else {
        nyawaDisplay.innerText = "🖤🖤🖤";
    }
}

function kemaskiniPerisaiUI() {
    const peratusShield = Math.round((nyawa / 3) * 100);
    shieldMeterBar.style.width = `${peratusShield}%`;

    if (nyawa === 3) {
        shieldMeterBar.style.background = "linear-gradient(90deg, #10b981, #059669)";
        shieldStatusText.innerText = "Perisai 100% Aktif";
        shieldStatusText.style.color = "#10b981";
    } else if (nyawa === 2) {
        shieldMeterBar.style.background = "linear-gradient(90deg, #f59e0b, #d97706)";
        shieldStatusText.innerText = "Perisai 66% (Waspada)";
        shieldStatusText.style.color = "#f59e0b";
    } else if (nyawa === 1) {
        shieldMeterBar.style.background = "linear-gradient(90deg, #ef4444, #b91c1c)";
        shieldStatusText.innerText = "Perisai 33% (Kritikal!)";
        shieldStatusText.style.color = "#ef4444";
    } else {
        shieldStatusText.innerText = "Perisai Lumpuh!";
        shieldStatusText.style.color = "#ef4444";
    }
}

function paparSoalan() {
    if (indeksSoalan < senaraiSoalan.length && nyawa > 0) {
        const peratus = Math.round((indeksSoalan / senaraiSoalan.length) * 100);
        progressText.innerText = `Soalan ${indeksSoalan + 1} / ${senaraiSoalan.length}`;
        progressPercent.innerText = `${peratus}%`;
        progressBarFill.style.width = `${peratus}%`;

        kategoriText.innerText = senaraiSoalan[indeksSoalan].kategori;
        teksSoalan.innerText = senaraiSoalan[indeksSoalan].soalan;
        quickTipText.innerText = senaraiSoalan[indeksSoalan].tip;
    } else if (nyawa <= 0) {
        tamatPermainanKalah();
    } else {
        tamatPermainanMenang();
    }
}

function semakJawapan(pilihanPengguna) {
    const soalanSemasa = senaraiSoalan[indeksSoalan];

    if (pilihanPengguna === soalanSemasa.jawapan) {
        mainkanBunyi('betul');
        streak++;
        let bonus = streak >= 3 ? 150 : 100;
        mataGanjaran += bonus;
        teksMarkah.innerText = mataGanjaran;

        if (streak >= 2) {
            streakBox.classList.remove('tersembunyi');
            streakText.innerText = `🔥 ${streak}x Streak! (+${bonus} XP)`;
        }

        teksMaklumBalas.style.color = "#10b981";
        teksMaklumBalas.innerText = "✅ Tepat! " + soalanSemasa.penjelasan;

        // Robot gembira melompat
        tukarEmosiRobot('gembira');
        const randomPujian = dialogCeria[Math.floor(Math.random() * dialogCeria.length)];
        mascotDialog.innerHTML = `"${randomPujian}"`;

    } else {
        mainkanBunyi('salah');
        nyawa--;
        streak = 0;
        streakBox.classList.add('tersembunyi');

        kemaskiniNyawaUI();
        kemaskiniPerisaiUI();

        teksMaklumBalas.style.color = "#ef4444";
        teksMaklumBalas.innerText = "❌ Kurang Tepat (-1 Nyawa). " + soalanSemasa.penjelasan;

        // Robot menangis berair mata
        tukarEmosiRobot('nangis');
        const randomKomen = dialogSalah[Math.floor(Math.random() * dialogSalah.length)];
        mascotDialog.innerHTML = `"${randomKomen}"`;
    }

    indeksSoalan++;

    if (nyawa <= 0) {
        setTimeout(tamatPermainanKalah, 650);
    } else {
        setTimeout(paparSoalan, 650);
    }
}

function tamatPermainanMenang() {
    mainkanBunyi('kemenangan');
    progressPercent.innerText = "100%";
    progressBarFill.style.width = "100%";
    kategoriTag.classList.add('tersembunyi');
    pilihanJawapan.classList.add('tersembunyi');
    streakBox.classList.add('tersembunyi');
    teksMaklumBalas.innerText = "";

    teksSoalan.innerText = `🎉 Misi Selesai! Skor Anda: ${mataGanjaran} XP`;

    if (mataGanjaran >= 1400) {
        ikonLencana.innerText = "🥇";
        namaLencana.innerText = "Lencana Emas: Pakar Pertahanan Siber";
        huraianLencana.innerText = "Luar biasa! Pertahanan siber anda hampir kebal daripada sebarang ancaman.";
        mascotDialog.innerHTML = `"Tabik hormat! Anda adalah Master Keselamatan Siber sejati!" 👑`;
    } else if (mataGanjaran >= 900) {
        ikonLencana.innerText = "🥈";
        namaLencana.innerText = "Lencana Perak: Wira Siber Berwaspada";
        huraianLencana.innerText = "Bagus! Anda memiliki tahap kewaspadaan siber yang sangat kukuh.";
        mascotDialog.innerHTML = `"Tahniah Wira! Sedikit lagi usaha untuk capai lencana emas!" 🌟`;
    } else {
        ikonLencana.innerText = "🥉";
        namaLencana.innerText = "Lencana Gangsa: Perantis Digital";
        huraianLencana.innerText = "Usaha yang terpuji! Teruskan latihan untuk memantapkan pertahanan.";
        mascotDialog.innerHTML = `"Jangan putus asa! Latihan berterusan kunci kejayaan pertahanan siber." 🛡️`;
    }

    ruangLencana.classList.remove('tersembunyi');
    butangMula.innerText = "Main Semula 🔄";
    butangMula.classList.remove('tersembunyi');
}

function tamatPermainanKalah() {
    mainkanBunyi('kalah');
    kategoriTag.classList.add('tersembunyi');
    pilihanJawapan.classList.add('tersembunyi');
    streakBox.classList.add('tersembunyi');
    teksMaklumBalas.innerText = "";

    teksSoalan.innerText = "💀 Pertahanan Siber Anda Ditembusi! (Game Over)";
    ruangLencana.classList.add('game-over-style');
    ikonLencana.innerText = "⚠️";
    namaLencana.innerText = "Amaran Keselamatan: Nyawa Habis";
    huraianLencana.innerText = `Anda tewas pada soalan ke-${indeksSoalan}. Jangan putus asa, kuatkan pertahanan dan cuba lagi!`;

    mascotDialog.innerHTML = `"Alamak! Sistem kita diceroboh! Tekan butang di bawah untuk pulihkan perisai!" 🚨`;

    ruangLencana.classList.remove('tersembunyi');
    butangMula.innerText = "Cuba Semula 🔁";
    butangMula.classList.remove('tersembunyi');
}

butangMula.addEventListener('click', mulaPermainan);
butangBetul.addEventListener('click', () => semakJawapan(true));
butangSalah.addEventListener('click', () => semakJawapan(false));

// ==========================================
// 5. PENDAFTARAN PWA (SERVICE WORKER)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('PWA Service Worker didaftarkan:', reg.scope))
            .catch((err) => console.log('Pendaftaran Service Worker gagal:', err));
    });
}
