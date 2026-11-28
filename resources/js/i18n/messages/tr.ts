import type { Messages } from '@/i18n/messages/en';

/* Turkish copy of the public site; same shape as en.ts. */

const tr: Messages = {
  layout: {
    topOfPage: 'Sayfanın başı',
    skipToContent: 'Ana içeriğe geç',
  },

  nav: {
    home: 'Ana sayfa',
    about: 'Hakkımda',
    posts: 'Yazılar',
    contact: 'İletişim',
    main: 'Ana menü',
    menu: 'Gezinme menüsü',
    login: 'Giriş yap',
    getInTouch: 'İletişime geçin',
    switchLabel: 'This page in English',
  },

  paths: {
    about: 'hakkımda',
    posts: 'yazılar',
    contact: 'iletişim',
    approach: 'yaklaşım',
  },

  common: {
    opensInNewTab: '(yeni sekmede açılır)',
    elsewhere: 'Diğer hesaplarım',
    showMore: 'Daha fazla göster',
    showLess: 'Daha az göster',
    backHome: 'Ana sayfaya dön',
    allPosts: 'Tüm yazılar',
    readAboutMe: 'Hakkımda',
    minutes: (count) => `${count} dk`,
    minutesRead: (count) => `${count} dk okuma`,
    read: 'okuma',
  },

  footer: {
    sayHello: 'merhaba-de',
    sayHelloText: 'Yeni projelere, sorulara ve iyi fikirlere açığım.',
    elsewhere: 'diğer-hesaplar',
    rights: 'Tüm hakları saklıdır.',
    backToTop: 'Başa dön',
    theme: { label: 'Tema', light: 'Açık', dark: 'Koyu', system: 'Sistem' },
    cookieSettings: 'Çerez ayarları',
  },

  cookies: {
    path: 'çerezler',
    region: 'Çerez izni',
    title: 'Birkaç çerez, izleme yok',
    text: 'Bu site çalışmak için ve izin verirsen temanı hatırlamak için çerez kullanır. Analitik yok, reklam yok, üçüncü taraflarla paylaşılan bir şey yok.',
    noTracking: 'İzleme yok · Reklam yok',
    acceptAll: 'Tümünü kabul et',
    rejectAll: 'Tümünü reddet',
    customize: 'Özelleştir',
    save: 'Seçimleri kaydet',
    settingsTitle: 'Çerez ayarları',
    settingsText:
      'Bu sitenin hangi çerezleri kullanabileceğini seç. Kararını istediğin zaman alt bilgiden değiştirebilirsin.',
    alwaysOn: 'Her zaman açık',
    on: 'Açık',
    off: 'Kapalı',
    categories: {
      necessary: {
        title: 'Zorunlu',
        text: 'Siteyi güvende ve çalışır tutar: formları sahte isteklere karşı korur ve bu seçimini hatırlar.',
      },
      preferences: {
        title: 'Tercihler',
        text: 'Seçtiğin temayı (açık, koyu ya da sistem) ziyaretler arasında hatırlar.',
      },
    },
  },

  profile: {
    lead: 'Veritabanı ve API’den insanların gerçekten kullandığı arayüze kadar web ürünlerini uçtan uca geliştiriyorum.',
    body: 'Erişilebilirliğe, performansa ve sürdürülebilir koda önem veriyorum; bir özelliği ilk fikirden yayına kadar sahiplenmeyi seviyorum.',
    role: 'Full stack geliştirici',
    location: 'İstanbul, Türkiye',
    focus: 'Uçtan uca ürünler',
    city: 'İstanbul',
    aboutDescription: 'Kim olduğum, ne yaptığım ve elimin gittiği araçlar.',
    focusAreas: [
      { label: 'Frontend', value: 'React ve Next.js ile erişilebilir, hızlı arayüzler.' },
      { label: 'Backend', value: 'Node.js, PHP ve Laravel ile API’ler ve veri modelleri.' },
      { label: 'Mobil', value: 'Swift ve SwiftUI ile native iOS uygulamaları.' },
    ],
    principles: [
      {
        title: 'Asıl soruyu bul.',
        detail:
          'Dikkatle dinle, hareketli parçaları anlamlandır ve bir şey yapmadan önce neyin önemli olduğunda anlaş.',
      },
      {
        title: 'Kaçınılmaz hissettir.',
        detail: 'Özenli tasarım, işe yarayan teknoloji ve biraz da ölçülülükle fikre net bir biçim ver.',
      },
      {
        title: 'Doğru hissettirene dek incelt.',
        detail: 'Etkileşimleri ince ayarla, sürtünmeyi kaldır ve son ayrıntılara hak ettikleri özeni göster.',
      },
    ],
    stackGroups: {
      languages: 'Diller',
      frameworks: 'Framework’ler',
      platform: 'Platform ve veri',
      tooling: 'Araçlar',
    },
  },

  time: {
    sameTime: 'Sizinle aynı saat',
    difference: (hours, minutes, ahead) =>
      `Sizden ${[hours && `${hours} sa`, minutes && `${minutes} dk`].filter(Boolean).join(' ')} ${ahead ? 'ileride' : 'geride'}`,
    timeIn: (city) => `${city} saati`,
    localTimeIn: (city) => `${city} yerel saati`,
    atDesk: 'Büyük ihtimalle masamdayım',
    awayFromDesk: 'Büyük ihtimalle masamda değilim',
    workingHours: (start, end, city) => `Hafta içi genellikle ${city} saatiyle ${start}–${end} arası çalışıyorum.`,
    weekdays: (city) => `Hafta içi, ${city} saatiyle`,
  },

  hero: {
    eyebrow: 'Tasarımda özenli. Doğuştan meraklı.',
    // Short on purpose: "Merhaba, ben" wraps the hero heading onto three lines.
    greeting: 'Ben',
    intro:
      'Özenli fikirleri, fikir aşamasından tamamlanana dek titizlikle işlenmiş, anlamlı dijital deneyimlere dönüştürüyorum.',
    exploreWork: 'İşlerime göz atın',
    aboutMe: 'Biraz benden',
  },

  aboutSection: {
    tagline: 'Biraz benden',
    title: 'Web’i uçtan uca inşa ediyorum.',
    bio: 'Biyografi',
    details: 'Ayrıntılar',
    role: 'Rol',
    location: 'Konum',
    experience: 'Deneyim',
    years: (count) => `${count}+ yıl`,
    focus: 'Odak',
    timezone: 'Saat dilimi',
    whatIDo: 'Neler yapıyorum',
    stack: 'Teknolojiler',
    stackIntro: 'Web uygulamalarından native iOS’a, her gün kullandığım diller, framework’ler ve araçlar.',
    stackContinued: 'Teknolojiler, devamı',
    play: 'Oynat',
    pause: 'Duraklat',
    playScrolling: 'Kaydırmayı oynat',
    pauseScrolling: 'Kaydırmayı duraklat',
    moreSections: '(2 bölüm daha: Neler yapıyorum ve Teknolojiler)',
  },

  postsSection: {
    tagline: 'Son yazılar ve düşünceler',
  },

  posts: {
    title: 'Aklımdan çıkmayan şeyler.',
    description: 'Üretmek, fark etmek ve daha net bir yol bulmak üzerine kısa notlar.',
    emptyTitle: 'Yazı bulunamadı.',
    emptyDetail: 'Saklanıyor, erteleniyor ya da taslakta takılıp kalmış olabilirler.',
    listTitle: 'Tüm yazılar',
    columns: { date: 'Tarih', title: 'Başlık', read: 'Okuma' },
    breadcrumb: 'Sayfa yolu',
    morePosts: 'Diğer yazılar',
    newer: 'Daha yeni yazı',
    older: 'Daha eski yazı',
    published: 'Yayın',
    updated: 'Güncelleme',
  },

  approach: {
    tagline: 'Küçük adımlar, özenli sonuçlar',
    titleStart: 'Önce düşünce.',
    titleEnd: 'Hep zanaat.',
    description: 'Net bir süreç, güzel sürprizlere yer açar. Oraya şöyle varmayı seviyorum.',
  },

  contact: {
    title: 'Aklınızda güzel bir fikir mi var?',
    description: 'Projenizi konuşalım ve birbirimize uygun olup olmadığımızı görelim.',
    tagline: 'Güzel şeyler bir sohbetle başlar',
    availability: 'Yeni projelere açığım',
    replyTime: 'Genellikle 24 saat içinde yanıt veririm.',
    emailSubject: 'Proje talebi',
    getInTouch: 'İletişime geçin',
    copyEmail: 'E-postayı kopyala',
    copyAddress: 'Adresi kopyala',
    copied: 'Kopyalandı',
    copiedMessage: 'E-posta adresi panoya kopyalandı',
    copyError: 'E-posta adresi kopyalanamadı. Bunun yerine e-posta bağlantısını kullanın.',
    moreLinks: (count) => `(${count} bağlantı daha)`,
    writeToMe: 'Bana yazın',
    startEmail: 'E-posta yazın',
    whenToExpect: 'Ne zaman yanıt beklenir',
    replyTimeLabel: 'Yanıt süresi',
    workingHoursLabel: 'Çalışma saatleri',
  },

  aboutPage: {
    atAGlance: 'Kısaca',
    role: 'Rol',
    basedIn: 'Yaşadığım yer',
    experience: 'Deneyim',
    focus: 'Odak',
    localTime: 'Yerel saat',
    onThisPage: 'Bu sayfada',
    chapters: {
      whatIDo: 'Neler yapıyorum',
      howIWork: 'Nasıl çalışıyorum',
      stack: 'Teknolojiler',
      elsewhere: 'Diğer hesaplarım',
    },
    step: (count) => `Adım ${count}`,
    elsewhereText: 'Beni bu platformlarda bulabilir ya da doğrudan yazabilirsiniz.',
  },

  errors: {
    label: (status) => `Hata ${status}`,
    403: {
      title: 'Erişim engellendi',
      message: 'Bu sayfa var, ancak erişim izniniz yok.',
      shell: (path) => `cd: ${path}: Erişim engellendi`,
    },
    404: {
      title: 'Sayfa bulunamadı',
      message: 'Aradığınız sayfa yok ya da taşınmış.',
      shell: (path) => `cd: ${path}: Böyle bir dosya ya da dizin yok`,
    },
    500: {
      title: 'Bir şeyler ters gitti',
      message: 'Benden kaynaklanan bir hata bu sayfanın yüklenmesini engelledi. Lütfen biraz sonra tekrar deneyin.',
      shell: (path) => `${path}: süreç 1 koduyla sonlandı`,
    },
    503: {
      title: 'Birazdan buradayım',
      message: 'Site bakımda. Lütfen birkaç dakika sonra tekrar bakın.',
      shell: (path) => `${path}: hizmet kullanılamıyor`,
    },
    reportProblem: 'Sorun bildir',
    tryThese: 'Ya da şunlardan birini deneyin',
  },
};

export default tr;
