document.addEventListener('DOMContentLoaded', function() {
    const surahSelect = document.getElementById('surah-select');
    const ayahInput = document.getElementById('ayah-number');
    const loadButton = document.getElementById('load-quran');
    const randomButton = document.getElementById('load-random');
    const quranDisplay = document.getElementById('quran-display');
    
    // Surah names with their respective numbers
    const surahs = [
        {number: 1, name: "الفاتحة (الفاتیحە)"},
        {number: 2, name: "البقرة (بەقەرە)"},
        {number: 3, name: "آل عمران (ئالی عیمران)"},
        {number: 4, name: "النساء (نیسا)"},
        {number: 5, name: "المائدة (مائیدە)"},
        {number: 6, name: "الأنعام (ئەنعام)"},
        {number: 7, name: "الأعراف (ئەعراف)"},
        {number: 8, name: "الأنفال (ئەنفال)"},
        {number: 9, name: "التوبة (تەوبە)"},
        {number: 10, name: "يونس (یونس)"},
        {number: 11, name: "هود (هود)"},
        {number: 12, name: "يوسف (یوسف)"},
        {number: 13, name: "الرعد (ڕەعد)"},
        {number: 14, name: "إبراهيم (ئیبراهیم)"},
        {number: 15, name: "الحجر (حیجر)"},
        {number: 16, name: "النحل (نەحل)"},
        {number: 17, name: "الإسراء (ئیسرا)"},
        {number: 18, name: "الكهف (کەهف)"},
        {number: 19, name: "مريم (مەریەم)"},
        {number: 20, name: "طه (تاها)"},
        {number: 21, name: "الأنبياء (ئەنبیا)"},
        {number: 22, name: "الحج (حەج)"},
        {number: 23, name: "المؤمنون (موئمینون)"},
        {number: 24, name: "النور (نور)"},
        {number: 25, name: "الفرقان (فورقان)"},
        {number: 26, name: "الشعراء (شوعەرا)"},
        {number: 27, name: "النمل (نەمل)"},
        {number: 28, name: "القصص (قەسەس)"},
        {number: 29, name: "العنكبوت (عەنکەبوت)"},
        {number: 30, name: "الروم (ڕۆم)"},
        {number: 31, name: "لقمان (لوقمان)"},
        {number: 32, name: "السجدة (سەجدە)"},
        {number: 33, name: "الأحزاب (ئەحزاب)"},
        {number: 34, name: "سبأ (سەبەئ)"},
        {number: 35, name: "فاطر (فاتیر)"},
        {number: 36, name: "يس (یاسین)"},
        {number: 37, name: "الصافات (سافات)"},
        {number: 38, name: "ص (ساد)"},
        {number: 39, name: "الزمر (زومەر)"},
        {number: 40, name: "غافر (غافیر)"},
        {number: 41, name: "فصلت (فوسیلەت)"},
        {number: 42, name: "الشورى (شورا)"},
        {number: 43, name: "الزخرف (زوخروف)"},
        {number: 44, name: "الدخان (دوخان)"},
        {number: 45, name: "الجاثية (جاسیە)"},
        {number: 46, name: "الأحقاف (ئەحقاف)"},
        {number: 47, name: "محمد (موحەممەد)"},
        {number: 48, name: "الفتح (فەتح)"},
        {number: 49, name: "الحجرات (حوجورات)"},
        {number: 50, name: "ق (قاف)"},
        {number: 51, name: "الذاريات (زاریات)"},
        {number: 52, name: "الطور (تور)"},
        {number: 53, name: "النجم (نەجم)"},
        {number: 54, name: "القمر (قەمەر)"},
        {number: 55, name: "الرحمن (ڕەحمان)"},
        {number: 56, name: "الواقعة (واقیعە)"},
        {number: 57, name: "الحديد (حەدید)"},
        {number: 58, name: "المجادلة (موجادەلە)"},
        {number: 59, name: "الحشر (حەشر)"},
        {number: 60, name: "الممتحنة (مومتەحینە)"},
        {number: 61, name: "الصف (سەف)"},
        {number: 62, name: "الجمعة (جوموعە)"},
        {number: 63, name: "المنافقون (مونافیقون)"},
        {number: 64, name: "التغابن (تەغابون)"},
        {number: 65, name: "الطلاق (تەڵاق)"},
        {number: 66, name: "التحريم (تەحریم)"},
        {number: 67, name: "الملك (مولک)"},
        {number: 68, name: "القلم (قەڵەم)"},
        {number: 69, name: "الحاقة (حاقە)"},
        {number: 70, name: "المعارج (مەعاریج)"},
        {number: 71, name: "نوح (نوح)"},
        {number: 72, name: "الجن (جین)"},
        {number: 73, name: "المزمل (موزەممیل)"},
        {number: 74, name: "المدثر (موددەسیر)"},
        {number: 75, name: "القيامة (قیامە)"},
        {number: 76, name: "الإنسان (ئینسان)"},
        {number: 77, name: "المرسلات (مورسەلات)"},
        {number: 78, name: "النبأ (نەبەئ)"},
        {number: 79, name: "النازعات (نازیعات)"},
        {number: 80, name: "عبس (عەبەس)"},
        {number: 81, name: "التكوير (تەکویر)"},
        {number: 82, name: "الإنفطار (ئینفیتار)"},
        {number: 83, name: "المطففين (موتەففیفین)"},
        {number: 84, name: "الإنشقاق (ئینشیقاق)"},
        {number: 85, name: "البروج (بوروج)"},
        {number: 86, name: "الطارق (تاریق)"},
        {number: 87, name: "الأعلى (ئەعلا)"},
        {number: 88, name: "الغاشية (غاشیە)"},
        {number: 89, name: "الفجر (فەجر)"},
        {number: 90, name: "البلد (بەلەد)"},
        {number: 91, name: "الشمس (شەمس)"},
        {number: 92, name: "الليل (لەیل)"},
        {number: 93, name: "الضحى (زوحا)"},
        {number: 94, name: "الشرح (شەرح)"},
        {number: 95, name: "التين (تین)"},
        {number: 96, name: "العلق (عەلەق)"},
        {number: 97, name: "القدر (قەدر)"},
        {number: 98, name: "البينة (بەییینە)"},
        {number: 99, name: "الزلزلة (زەلزەلە)"},
        {number: 100, name: "العاديات (عادیات)"},
        {number: 101, name: "القارعة (قاریعە)"},
        {number: 102, name: "التكاثر (تەکاسور)"},
        {number: 103, name: "العصر (عەسر)"},
        {number: 104, name: "الهمزة (هومەزە)"},
        {number: 105, name: "الفيل (فیل)"},
        {number: 106, name: "قريش (قورەیش)"},
        {number: 107, name: "الماعون (ماعون)"},
        {number: 108, name: "الكوثر (کەوسەر)"},
        {number: 109, name: "الكافرون (کافیرون)"},
        {number: 110, name: "النصر (نەسر)"},
        {number: 111, name: "المسد (مەسەد)"},
        {number: 112, name: "الإخلاص (ئیخلاس)"},
        {number: 113, name: "الفلق (فەلەق)"},
        {number: 114, name: "الناس (ناس)"}
    ];
    
    // Populate surah dropdown
    surahs.forEach(surah => {
        const option = document.createElement('option');
        option.value = surah.number;
        option.textContent = `${surah.number}. ${surah.name}`;
        surahSelect.appendChild(option);
    });
    
    // Load button click handler
    loadButton.addEventListener('click', function() {
        const surahNumber = surahSelect.value;
        const ayahNumber = ayahInput.value;
        
        if (!surahNumber) {
            alert('تکایە سوورەتێک هەڵبژێرە');
            return;
        }
        
        loadQuranVerses(surahNumber, ayahNumber);
    });
    
    // Random button click handler
    randomButton.addEventListener('click', function() {
        // Get random surah
        const randomSurah = Math.floor(Math.random() * 114) + 1;
        
        // Get random ayah - we'll let the API handle this by not specifying ayah
        loadQuranVerses(randomSurah, '');
        
        // Update the select dropdown to show the selected surah
        surahSelect.value = randomSurah;
        // Clear the ayah input
        ayahInput.value = '';
    });
    
    // Function to fetch and display Quran verses
    function loadQuranVerses(surahNumber, ayahNumber) {
        quranDisplay.innerHTML = '<div class="loading">بارکردن...</div>';
        
        let apiUrl;
        if (ayahNumber) {
            // Fetch specific ayah
            apiUrl = `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ar.alafasy`;
        } else {
            // Fetch entire surah
            apiUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`;
        }
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('خزمەتگوزاری دەرهێنانی داتای قورئان بەردەست نییە');
                }
                return response.json();
            })
            .then(data => {
                if (ayahNumber) {
                    // Display single ayah
                    displaySingleAyah(data.data);
                } else {
                    // Display entire surah
                    displaySurah(data.data);
                }
            })
            .catch(error => {
                quranDisplay.innerHTML = `<div class="error-message">${error.message}</div>`;
            });
    }
    
    // Function to display a single ayah
    function displaySingleAyah(ayah) {
        let html = `
            <div class="surah-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div class="verse">
                <span class="verse-number">${ayah.numberInSurah}</span>
                <div class="verse-text">${ayah.text}</div>
                <div class="surah-info">سوورەتی ${surahs[ayah.surah.number - 1].name} - ئایەتی ${ayah.numberInSurah}</div>
            </div>
        `;
        
        quranDisplay.innerHTML = html;
    }
    
    // Function to display an entire surah
    function displaySurah(surah) {
        let html = '';
        
        // Add bismillah except for Surah 9
        if (surah.number !== 9) {
            html += '<div class="surah-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>';
        }
        
        // Add surah title
        html += `<h2 class="surah-title">${surah.name} (${surah.englishName})</h2>`;
        
        // Add all verses
        surah.ayahs.forEach(ayah => {
            html += `
                <div class="verse">
                    <span class="verse-number">${ayah.numberInSurah}</span>
                    <div class="verse-text">${ayah.text}</div>
                </div>
            `;
        });
        
        quranDisplay.innerHTML = html;
    }
});
