/* ===================================================
   izLine Marine — JavaScript Dosyası
   =================================================== */

/* ─────────────────────────────────────────────────
   HAMBURGER MENU
   ───────────────────────────────────────────────── */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

// Toggle menu when hamburger is clicked
hamburgerBtn?.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
});

// Close menu when a link is clicked
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });
});

// Close menu when clicking overlay
menuOverlay?.addEventListener('click', () => {
  hamburgerBtn?.classList.remove('active');
  mobileMenu?.classList.remove('active');
  menuOverlay?.classList.remove('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburgerBtn?.contains(e.target) && !mobileMenu?.contains(e.target)) {
    hamburgerBtn?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    menuOverlay?.classList.remove('active');
  }
});

/* ─────────────────────────────────────────────────
   SCROLL REVEAL
   ───────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────────────
   İLERLEME ÇUBUĞU
   ───────────────────────────────────────────────── */
function updateProgress() {
  const seg  = document.querySelector('input[name=segment]:checked')?.value || 'tekne';
  const total = 4;
  const done  = seg ? 3 : 2;
  document.getElementById('progFill').style.width = (done / total * 100) + '%';
  document.getElementById('progLabel').textContent = `Adım ${done} / ${total}`;
}

/* ─────────────────────────────────────────────────
   SEGMENT SEÇİCİ
   ───────────────────────────────────────────────── */
function selectSeg(label, val) {
  document.querySelectorAll('.seg').forEach(s => s.classList.remove('active'));
  label.classList.add('active');
  renderDyn(val);
  updateProgress();
}

/* ─────────────────────────────────────────────────
   YARDIMCI: CHECKBOX GRUBU
   ───────────────────────────────────────────────── */
function checks(name, items) {
  return `<div class="checks-grid">` +
    items.map(i => `
      <label class="check-label">
        <input type="checkbox" name="${name}" value="${i}"/>
        <span>${i}</span>
      </label>`).join('') +
    `</div>`;
}

/* ─────────────────────────────────────────────────
   YARDIMCI: RATING MATRİSİ
   ───────────────────────────────────────────────── */
const opts4 = ['Düşük', 'Orta', 'Yüksek', 'Kritik'];
const opts3 = ['Az Önemli', 'Önemli', 'Çok Önemli'];

function matrix(name, items, opts) {
  const cls   = opts.length === 4 ? 'cols4' : 'cols3';
  const heads = `<div></div>` + opts.map(o => `<div class="matrix-head">${o}</div>`).join('');
  const rows  = items.map(item => {
    const n      = name + '_' + safeName(item);
    const radios = opts.map(o =>
      `<label class="matrix-opt"><input type="radio" name="${n}" value="${o}"/><span>${o}</span></label>`
    ).join('');
    return `<div class="matrix-row ${cls}"><div class="matrix-item">${item}</div>${radios}</div>`;
  }).join('');
  return `<div class="matrix"><div class="matrix-row ${cls}">${heads}</div>${rows}</div>`;
}

function safeName(t) {
  return t.toLowerCase()
    .replace(/[ğ]/g,'g').replace(/[ü]/g,'u').replace(/[ş]/g,'s')
    .replace(/[ı]/g,'i').replace(/[ö]/g,'o').replace(/[ç]/g,'c')
    .replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'').slice(0, 46);
}

function field(name, label, type = 'text', placeholder = '') {
  return `<label class="field"><span>${label}</span><input name="${name}" type="${type}" placeholder="${placeholder}"/></label>`;
}

function select(name, label, opts) {
  return `<label class="field"><span>${label}</span><select name="${name}">${opts.map(o => `<option>${o}</option>`).join('')}</select></label>`;
}

/* ─────────────────────────────────────────────────
   SADECE HARFLERE İZİN VER
   ───────────────────────────────────────────────── */
function allowOnlyLetters(inputName) {
  const input = document.querySelector(`input[name="${inputName}"]`);
  if (!input) return;

  input.addEventListener('keydown', function (e) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', ' ', '-'];
    // Türkçe ve İngilizce harfleri kabul et
    const isLetter = /^[a-zA-ZçğıöşüÇĞİÖŞÜ]$/.test(e.key);
    
    if (!allowedKeys.includes(e.key) && !isLetter) {
      e.preventDefault();
    }
  });

  // Yapıştırma (paste) kontrol
  input.addEventListener('paste', function (e) {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    // Sadece harfleri, boşlukları ve tireyi tut
    const cleanText = pastedText.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ\s-]/g, '');
    input.value = cleanText;
  });
}

/* ─────────────────────────────────────────────────
   SADECE NUMALARA İZİN VER
   ───────────────────────────────────────────────── */
function allowOnlyNumbers(inputName) {
  const input = document.querySelector(`input[name="${inputName}"]`);
  if (!input) return;

  input.addEventListener('keydown', function (e) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (!allowedKeys.includes(e.key) && isNaN(Number(e.key))) {
      e.preventDefault();
    }
  });

  // Yapıştırma (paste) kontrol
  input.addEventListener('paste', function (e) {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    // Sadece sayıları tut
    const cleanText = pastedText.replace(/\D/g, '');
    input.value = cleanText;
  });
}

// Form yüklendiğinde input'larına fonksiyonları uygula
document.addEventListener('DOMContentLoaded', function () {
  // Sadece harfler (statik input'lar)
  allowOnlyLetters('ad_soyad');
  allowOnlyLetters('kurum');
  allowOnlyLetters('sehir');
  
  // Sadece sayılar (statik input'lar)
  // Telefon zaten ayrı event listener'ı var
  
  // İlk kez tekne template'ını göster ve dinamik input'lara fonksiyon uygula
  renderDyn('tekne');
});

document.getElementById('phoneInput').addEventListener('input', function (e) {
  // Sadece sayıları al
  let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  
  // Formatı oluştur: 5XX XXX XX XX
  e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
});

// Kullanıcı harf girmeye çalışırsa engelle (Sadece sayı ve kontrol tuşları)
document.getElementById('phoneInput').addEventListener('keydown', function (e) {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
  if (!allowedKeys.includes(e.key) && isNaN(Number(e.key))) {
    e.preventDefault();
  }
});

/* ─────────────────────────────────────────────────
   DİNAMİK FORM ŞABLONLARı
   ───────────────────────────────────────────────── */
const templates = {

  /* ── TEKNE SAHİBİ ── */
  tekne: `
    <div class="qgroup">
      <h4>Tekne bilgileri</h4>
      <div class="grid3">
        ${select('tekne_tipi','Tekne türünüz',['Motor Yat','Yelkenli','RIB / Bot','Gulet / Katamaran','Sürat Teknesi','Ticari Tekne'])}
        ${select('tekne_uzunluk','Tekne uzunluğu',['6–9 m','9–12 m','12–16 m','16–24 m','24 m +'])}
        ${select('tekne_adet','Sahip olduğunuz tekne sayısı',['1','2–3','4–6','7+'])}
      </div>
      <div class="grid2">
        ${select('marina_var','Tekneniz marinada mı yatıyor?',['Evet, yıllık bağlamalı','Evet, sezonluk','Hayır, özel iskele','Seyir halindeyim / değişken'])}
        ${select('tekne_kullanim','Teknenizi ne sıklıkla kullanıyorsunuz?',['Haftada birden fazla','Haftada bir','Ayda birkaç kez','Sezonda birkaç kez','Nadiren'])}
        ${select('bakim_mevcut','Şu an bir bakım/izleme sistemi var mı?',['Hayır, hiç yok','Manuel takip ediyorum','Farklı bir sistem kullanıyorum'])}
        ${select('sigorta_var','Tekneniz sigortalı mı?',['Evet, tam kapsamlı','Evet, kısmi','Hayır'])}
      </div>
    </div>
    <div class="qgroup">
      <h4>Yaşadığınız sorunlar</h4>
      <p class="qgroup-lead">Hangi konularda sorun yaşıyorsunuz?</p>
      ${checks('tekne_sorun',['Akü boşalması','Su alma / bilge sorunu','Hırsızlık / izinsiz giriş','Bakım takibinin zorluğu','Servis bulamamak','Sigorta süreçleri','Hasar tespit gecikmesi','Uzaktan kontrol eksikliği','Konum takibi','Fırtına / hava uyarısı'])}
    </div>
    <div class="qgroup">
      <h4>Önem öncelikleri</h4>
      <p class="qgroup-lead">Bu özelliklerin sizin için önem derecesi nedir?</p>
      ${matrix('tekne_puan',['Akü voltajı & enerji izleme','Bilge su seviyesi uyarısı','İzinsiz giriş alarmı','Gerçek zamanlı konum','Motor saati & bakım hatırlatma','Mobil uygulama bildirimleri','Servis çağrı sistemi','Fırtına / hava uyarıları','Sigorta veri kaydı','Uzaktan kapı / motor kilidi'],opts4)}
    </div>
    <div class="qgroup">
      <h4>Ek bilgiler</h4>
      <div class="grid2">
        ${select('notif_kanal','Uyarı bildirimini nasıl almak istersiniz?',['Push bildirimi (mobil)','WhatsApp','SMS','E-posta','Hepsi'])}
        ${select('donanim_kurulum','Kurulumu kim yapmalı?',['Yetkili servis gelsin','Kendin kurarım','Her ikisi de olur'])}
        <label class="field"><span>Aylık ne kadar ödemeyi düşünürsünüz?</span>
          <select name="tekne_butce_aylik">
            <option>Henüz bilmiyorum</option>
            <option>500 TL'ye kadar</option>
            <option>500–1.000 TL</option>
            <option>1.000–3.000 TL</option>
            <option>3.000–5.000 TL</option>
            <option>5.000 TL+</option>
          </select>
        </label>
        ${select('beta_ilgi','Beta testi için gönüllü olur musunuz?',['Evet, ürün hazır olunca','Belki, detay görmek isterim','Hayır'])}
      </div>
      <label class="field"><span>En büyük endişeniz veya beklentiniz nedir?</span>
        <textarea name="tekne_yorum" placeholder="Özgürce yazın — her şey değerli."></textarea>
      </label>
    </div>
  `,

  /* ── MARİNA ── */
  marina: `
    <div class="qgroup">
      <h4>Marina bilgileri</h4>
      <div class="grid3">
        ${select('marina_kapasite','Marina kapasitesi',['10–30 tekne','30–80 tekne','80–200 tekne','200+ tekne'])}
        ${select('marina_tipi','Marina türü',['Özel marina','Belediye marinası','Yat limanı','Yat çekek alanı / tersane','Karma'])}
        ${select('marina_hizmetler','Sunduğunuz ana hizmetler',['Yalnızca bağlama','Bağlama + temel hizmetler','Tam servisli marina','Bağlama + çekek + servis + ikmal'])}
      </div>
      <div class="grid2">
        ${select('marina_yonetim','Mevcut yönetim yazılımı var mı?',['Hayır','Excel/manuel','Marina yönetim yazılımı kullanıyoruz','Kendimiz geliştirdiğimiz sistem'])}
        ${select('marina_tekne_izleme','Bağlı tekne izleme sisteminiz var mı?',['Hayır','Kısmen (güvenlik kamerası vb.)','Evet, temel izleme','Evet, gelişmiş izleme'])}
      </div>
    </div>
    <div class="qgroup">
      <h4>Operasyonel sorunlar</h4>
      <p class="qgroup-lead">Hangi konularda en çok zorlanıyorsunuz?</p>
      ${checks('marina_sorun',['Bağlama yerlerinin doluluk takibi','Tekne sahipleriyle iletişim','Bakım kayıtları tutmak','Acil durum yönetimi','Servis koordinasyonu','Fatura ve ödeme takibi','Hasar tespiti / belgeleştirme','Fırtına/olay bildirimi','Yetersiz dijital altyapı','Çalışan koordinasyonu'])}
    </div>
    <div class="qgroup">
      <h4>Özellik öncelikleri</h4>
      ${matrix('marina_puan',['Bağlı teknelerin anlık izlenmesi','Tekne sahibine otomatik uyarı gönderimi','Doluluk ve bağlama yeri yönetimi','Arıza/olay kayıt sistemi','Dijital fatura ve ödeme','Hasar önce/sonra fotoğraf kaydı','Servis firması yönlendirme','Fırtına protokolü yönetimi','Sigorta entegrasyonu','Tekne geçmiş ve bakım kaydı'],opts4)}
    </div>
    <div class="qgroup">
      <h4>Karar ve entegrasyon</h4>
      <div class="grid2">
        ${select('marina_entegrasyon','Mevcut sistemlerinizle entegrasyon önemli mi?',['Evet, kritik','Olursa iyi','Şu an sistemimiz yok','Önemsiz'])}
        ${select('marina_pilot','Pilot süreç için hazır mısınız?',['Evet, hemen başlayabiliriz','6 ay içinde','Bir yıl içinde','Belirsiz'])}
        <label class="field"><span>Kaç çalışanınız bu sistemi kullanır?</span><input name="marina_calisan" placeholder="Örn. 4"/></label>
        <label class="field"><span>Aylık bütçe beklentiniz?</span>
          <select name="marina_butce">
            <option>Henüz bilmiyorum</option>
            <option>1.000 TL'ye kadar</option>
            <option>1.000–3.000 TL</option>
            <option>3.000–8.000 TL</option>
            <option>8.000 TL+</option>
          </select>
        </label>
      </div>
      <label class="field"><span>Marina olarak izLine'den en büyük beklentiniz?</span>
        <textarea name="marina_yorum" placeholder="Özgürce yazın."></textarea>
      </label>
    </div>
  `,

  /* ── FİLO ── */
  filo: `
    <div class="qgroup">
      <h4>Filo bilgileri</h4>
      <div class="grid3">
        ${select('filo_buyukluk','Filo büyüklüğü',['2–5 tekne','6–15 tekne','16–30 tekne','31–60 tekne','61+ tekne'])}
        ${select('filo_tipi','Filo türü',['Kiralık tekne filosu','Tur/gezi tekneleri','Ticari taşımacılık','Balıkçı filosu','Karma'])}
        ${select('filo_calisma_bolge','Çalışma bölgeniz',['Ege','Akdeniz','Marmara','Karadeniz','Birden fazla bölge'])}
      </div>
    </div>
    <div class="qgroup">
      <h4>Filo yönetim sorunları</h4>
      ${checks('filo_sorun',['Gerçek zamanlı konum takibi','Yakıt tüketimi optimizasyonu','Bakım takvimi yönetimi','Arıza bildirimi & müdahale','Ekip koordinasyonu','Müşteri/kargo takibi','Sigorta ve risk yönetimi','Rota optimizasyonu','Uzaktan durum izleme','Tekne başına maliyet analizi'])}
    </div>
    <div class="qgroup">
      <h4>Özellik öncelikleri</h4>
      ${matrix('filo_puan',['Gerçek zamanlı konumlar haritada','Yakıt & motor saati takibi','Bakım planı ve hatırlatma','Arıza tespiti & servis yönlendirme','Mürettebat / personel takibi','Rota kaydı & analiz','Sigorta hasar dosyası desteği','Filo genelinde durum özeti','Maliyet raporlaması','API/sistem entegrasyonu'],opts4)}
    </div>
    <div class="qgroup">
      <h4>Mevcut altyapı ve bütçe</h4>
      <div class="grid2">
        ${select('filo_mevcut_sistem','Şu an kullandığınız takip sistemi',['Yok','GPS tracker (basit)','Sektörel filo yazılımı','Kendi geliştirdiğimiz sistem'])}
        ${select('filo_memnuniyet','Mevcut sistemden memnuniyet',['Sistem yok','Memnunuz','Kısmen memnunuz','Memnun değiliz'])}
        <label class="field"><span>Tekne başına aylık bütçe?</span>
          <select name="filo_tekne_butce">
            <option>Henüz bilmiyorum</option>
            <option>300 TL'ye kadar</option>
            <option>300–700 TL</option>
            <option>700–1.500 TL</option>
            <option>1.500 TL+</option>
          </select>
        </label>
        ${select('filo_pilot','Pilot için hazır mısınız?',['Evet, hemen','3–6 ay içinde','Belirsiz'])}
      </div>
      <label class="field"><span>Filo yönetiminde en büyük dert nedir?</span>
        <textarea name="filo_yorum" placeholder="Özgürce yazın."></textarea>
      </label>
    </div>
  `,

  /* ── SERVİS ── */
  servis: `
    <div class="qgroup">
      <h4>Servis faaliyet alanı</h4>
      ${checks('servis_alan',['Motor servisi','Elektrik / elektronik','Akü & enerji sistemleri','Mekanik bakım','Fiber / tekne onarım','Navigasyon & cihaz montajı','Klima & jeneratör','Genel bakım','Acil müdahale','Mobil servis'])}
    </div>
    <div class="qgroup">
      <h4>Operasyon bilgileri</h4>
      <div class="grid2">
        <label class="field"><span>Yılda kaç tekneye hizmet veriyorsunuz?</span><input name="servis_yillik" placeholder="Örn. 150"/></label>
        ${select('servis_calisma','Nasıl çalışıyorsunuz?',['Sabit atölyeden','Mobil servis (denize gidiyoruz)','Her ikisi de'])}
        ${select('servis_talep_kanal','Servis talepleri nasıl geliyor?',['Telefon','WhatsApp','Referans','Web / dijital','Karma'])}
        ${select('servis_kayit','Müşteri ve bakım geçmişi kaydı',['Kayıt tutmuyoruz','Manuel / kağıt','Excel','Yazılım kullanıyoruz'])}
        <label class="field"><span>En sık aldığınız servis tipleri</span><input name="servis_sik" placeholder="Örn. motor - akü - elektrik"/></label>
        ${select('servis_acil','Acil çağrıları nasıl yönetiyorsunuz?',['Telefon','WhatsApp','Düzenli sistem yok','Servis yazılımıyla'])}
      </div>
    </div>
    <div class="qgroup">
      <h4>Özellik öncelikleri</h4>
      ${matrix('servis_puan',['Dijital servis talebi almak','Arıza verisi önceden görmek','Randevu & takvim yönetimi','Bakım geçmişi kaydı','Parça değişim kaydı','Konuma göre yönlendirme','Tekrarlayan bakım hatırlatma','Teklif & iş emri süreci','Müşteri onay / imza','Garanti & sorumluluk kaydı'],opts3)}
    </div>
    <div class="qgroup">
      <h4>İş modeli değerlendirmesi</h4>
      <div class="grid2">
        ${select('servis_model','Nasıl dahil olmak istersiniz?',['Yetkili servis noktası olarak','Talep geldikçe hizmet vererek','Montaj + bakım partneri','Sadece teknik danışmanlık','Önce pilot görmek isteriz'])}
        ${select('servis_komisyon','Komisyon bazlı modele bakışınız',['Olumlu','Orana bağlı','Sabit ücret tercih ederim','Olumsuz'])}
      </div>
      <label class="field"><span>izLine'de yetkili servis olmak için en büyük endişeniz?</span>
        <textarea name="servis_yorum" placeholder="Özgürce yazın."></textarea>
      </label>
    </div>
  `,

  /* ── SİGORTA ── */
  sigorta: `
    <div class="qgroup">
      <h4>Kurum bilgileri</h4>
      <div class="grid2">
        ${select('sig_rol','Rolünüz',['Sigorta şirketi','Sigorta acentesi','Hasar eksperi','Risk değerlendirme uzmanı','Broker','Diğer'])}
        ${select('sig_deniz_yogun','Deniz sigortasındaki yoğunluğunuz',['Ana iş kolumuz değil','Orta yoğunluk','Yüksek / uzman'])}
        <label class="field"><span>Yıllık yaklaşık kaç deniz poliçesi yönetiyorsunuz?</span><input name="sig_police_adet" placeholder="Örn. 200"/></label>
        ${select('sig_en_sik_hasar','En sık hasar türleri',['Su alma / batma','Yangın','Çarpışma','Hırsızlık / vandalizm','Fırtına hasarı','Motor hasarı'])}
      </div>
    </div>
    <div class="qgroup">
      <h4>Veri ihtiyaçları öncelikleri</h4>
      ${matrix('sig_veri',['Akü / bilge / güvenlik olay kaydı','Konum ve hareket geçmişi','Bakım geçmişi & servis kaydı','Hasar öncesi/sonrası fotoğraf','Risk skoru oluşturma','Prim indirimi için doğrulanabilir veri','Hasar tespiti zaman çizelgesi','Tekne sahibi bakım davranışı','Marina kaynaklı güvenlik kaydı','Önleyici uyarıların raporlanması'],opts4)}
    </div>
    <div class="qgroup">
      <h4>Ürün ve iş modeli</h4>
      ${matrix('sig_puan',['Sensör verisine göre risk değerlendirme','Kullanan müşteriye prim avantajı','Hasar sürecinde olay verisi kullanma','Önleyici uyarılarla hasar azaltma','Gerçek zamanlı tekne verisi erişimi','Risk puanlama sistemi','izLine verisiyle yeni ürün geliştirme'],opts3)}
      <div class="grid2" style="margin-top:16px">
        ${select('sig_model','Sistemi nasıl konumlandırırsınız?',['Prim indirimi sağlayan önleyici sistem','Yüksek değerli yatlar için zorunlu paket','Hasar yönetimi / veri doğrulama aracı','Marina & filo poliçelerine entegre çözüm','Önce pilot / veri görülmeli'])}
        ${select('sig_veri_paylasim','Veri paylaşımına yaklaşımınız',['Olumlu','Yasal çerçeve netleşirse olumlu','Sadece anonim veri','Olumsuz'])}
      </div>
      <label class="field"><span>Önlenebileceğini düşündüğünüz hasar türleri nelerdir?</span>
        <textarea name="sig_onlenebilir" placeholder="Erken tespit / izleme ile önlenebilecek hasarları yazın."></textarea>
      </label>
    </div>
  `,

  /* ── DİĞER ── */
  diger: `
    <div class="qgroup">
      <h4>Sektördeki rolünüz</h4>
      <label class="field"><span>Kendinizi nasıl tanımlarsınız?</span><input name="diger_rol" placeholder="Örn. kaptan, yatırımcı, tedarikçi, tekne üreticisi, danışman..."/></label>
      <label class="field"><span>izLine hangi problemi çözerse sizin için değerli olur?</span><textarea name="diger_problem" placeholder="Gözlemlediğiniz ihtiyacı veya fikrinizi yazın."></textarea></label>
      <label class="field"><span>Sektörde çözümsüz kaldığını düşündüğünüz başka bir konu var mı?</span><textarea name="diger_ek" placeholder="Sizin bakış açınızdan denizcilikte dijital eksiklik nerede?"></textarea></label>
    </div>
    <div class="qgroup">
      <h4>Genel öncelik değerlendirmesi</h4>
      ${matrix('diger_puan',['Güvenlik & risk uyarıları','Bakım ve servis yönetimi','Veri & raporlama','Marina / servis / sigorta ekosistemi','Mobil uygulama ile takip','Teknik servis yönlendirme','İş ortaklığı / gelir modeli'],opts3)}
    </div>
  `
};

/* ─────────────────────────────────────────────────
   PRİORİTE MATRİSİ (Statik)
   ───────────────────────────────────────────────── */
const priItems = [
  'Gerçek zamanlı güvenlik uyarıları',
  'Bakım ve servis yönetimi',
  'Konum ve hareket takibi',
  'Veri analizi & raporlar',
  'Sigorta entegrasyonu',
  'Mobil uygulama kullanım kolaylığı',
  'Fiyat / değer dengesi'
];
document.getElementById('priMatrix').innerHTML = matrix('genel_oncelik', priItems, opts3);

/* ─────────────────────────────────────────────────
   DİNAMİK SORULARI RENDER ET
   ───────────────────────────────────────────────── */
function renderDyn(seg) {
  const titles = {
    tekne:   'Tekne Sahibine Özel Sorular',
    marina:  'Marina Yönetimine Özel Sorular',
    filo:    'Filo İşletmesine Özel Sorular',
    servis:  'Servis Firmasına Özel Sorular',
    sigorta: 'Sigorta / Ekspertiz Sorular',
    diger:   'Genel Değerlendirme Soruları'
  };
  document.getElementById('dynTitle').textContent     = titles[seg] || 'Size Özel Sorular';
  document.getElementById('dynQuestions').innerHTML   = templates[seg] || templates.diger;
  
  // Template eklendikten sonra dinamik input'lara fonksiyonları uygula
  applyDynamicInputValidation(seg);
}

/* ─────────────────────────────────────────────────
   DİNAMİK INPUT'LARA DOĞRULAMA UYGULA
   ───────────────────────────────────────────────── */
function applyDynamicInputValidation(seg) {
  // Segment'e göre dinamik input'ları tanımla
  const dynamicInputs = {
    tekne: [],
    marina: ['marina_calisan'],
    filo: [],
    servis: ['servis_yillik', 'servis_sik'],
    sigorta: ['sig_police_adet'],
    diger: ['diger_rol']
  };

  const inputsForSegment = dynamicInputs[seg] || [];

  // Her input için doğru fonksiyonu uygula
  inputsForSegment.forEach(inputName => {
    // marina_calisan, servis_yillik, sig_police_adet -> sayı
    // servis_sik, diger_rol -> harf
    if (['marina_calisan', 'servis_yillik', 'sig_police_adet'].includes(inputName)) {
      allowOnlyNumbers(inputName);
    } else if (['servis_sik', 'diger_rol'].includes(inputName)) {
      allowOnlyLetters(inputName);
    }
  });
}

/* ─────────────────────────────────────────────────
   FORM SUBMIT
   ───────────────────────────────────────────────── */
const form = document.getElementById('surveyForm');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "f49b671e-4229-4996-a719-9ecc9ec0fe02");

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Gönderiliyor...";
  submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            const msg = document.getElementById('successMsg');
            msg.style.display = 'block';
            msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('progFill').style.width = '100%';
            document.getElementById('progLabel').textContent = 'Tamamlandı ✓';
            form.reset();
        } else {
            console.error('Form submit error:', data);
            alert("Bir şeyler yanlış gitti. Lütfen tekrar deneyin: " + (data.message || data.error || 'Bilinmeyen hata'));
        }

    } catch (error) {
        alert("Bir şeyler yanlış gitti. Lütfen tekrar deneyin.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});