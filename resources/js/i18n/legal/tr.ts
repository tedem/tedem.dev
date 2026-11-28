import type { LegalDocuments } from '@/i18n/legal/types';

/*
 * Turkish legal documents: the same documents and section ids as en.ts.
 */

const tr: LegalDocuments = {
  privacy: {
    title: 'Gizlilik Politikası',
    description:
      'tedem.dev’in hangi kişisel verileri, neden ve ne kadar süreyle işlediği ve bu verilerle ilgili hakların.',
    path: 'gizlilik',
    updated: '2026-11-28',
    summary: [
      'Analitik yok, reklam yok, üçüncü taraf izleyici yok.',
      'Sunucu, güvenlik için kısa süreli kayıtlar (IP adresi, sayfa, tarayıcı) tutar; bunlar 14 gün sonra silinir.',
      'Yalnızca sitenin ihtiyaç duyduğu çerezler ve izin verirsen bir tema çerezi.',
      'Bana e-posta yazarsan mesajın yalnızca sana yanıt vermek için kullanılır.',
    ],
    sections: [
      {
        id: 'controller',
        title: 'Veri sorumlusu',
        blocks: [
          'tedem.dev, İstanbul’da yaşayan {owner} tarafından yürütülen kişisel bir web sitesidir. Burada anlatılan kişisel veriler için 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve uygulandığı durumlarda AB Genel Veri Koruma Tüzüğü (GDPR) kapsamında veri sorumlusu {owner}’dır.',
          'Bu politika ya da verilerinle ilgili her konuda {email} adresine yazabilirsin.',
        ],
      },
      {
        id: 'data',
        title: 'Hangi veriler, neden işlenir',
        blocks: [
          {
            table: {
              head: ['Veri', 'Amaç', 'Hukuki sebep', 'Saklama süresi'],
              rows: [
                [
                  'Sunucu kayıtları: IP adresi, tarih ve saat, istenen sayfa, tarayıcı bilgisi (user agent), gelinen sayfa',
                  'Siteyi güvenli ve çalışır tutmak, hataları ve kötüye kullanımı tespit etmek',
                  'Meşru menfaat (KVKK md. 5/2-f, GDPR md. 6(1)(f))',
                  '14 gün',
                ],
                [
                  'Zorunlu çerezler',
                  'Oturum, formları sahte isteklere karşı koruma, çerez tercihini hatırlama',
                  'Meşru menfaat; sitenin çalışması için zorunlu',
                  'Aşağıdaki Çerezler bölümüne bak',
                ],
                [
                  'Tema tercihi (çerez ve yerel depolama)',
                  'Açık, koyu ya da sistem temasını ziyaretler arasında hatırlamak',
                  'Açık rızan (KVKK md. 5/1, GDPR md. 6(1)(a))',
                  '1 yıl ya da rızanı geri alana kadar',
                ],
                [
                  'Gönderdiğin e-postalar: adresin, adın ve mesajın',
                  'Mesajını okumak ve yanıtlamak',
                  'Meşru menfaat; talebin üzerine atılan adımlar (KVKK md. 5/2-c, GDPR md. 6(1)(b))',
                  'Yazışma bitene kadar, en fazla 2 yıl',
                ],
                [
                  'Yorumlar: adın, e-posta adresin ve yorumun',
                  'Yorumu incelendikten sonra adınla yayımlamak; e-posta adresi hiçbir zaman gösterilmez, yalnızca sana özelden yanıt vermek ya da kötüye kullanımla ilgilenmek için kullanılır',
                  'Yayımlanma talebin (KVKK md. 5/2-c, GDPR md. 6(1)(b)); moderasyon için meşru menfaat',
                  'Yazı yayında kaldıkça ya da kaldırılmasını isteyene kadar',
                ],
                [
                  'Hesap verileri, yalnızca kayıt olursan: ad, e-posta, parola (özetlenmiş olarak), iki adımlı doğrulama ve passkey verileri',
                  'Yönetim paneline giriş',
                  'Sözleşmenin kurulması ve ifası (KVKK md. 5/2-c, GDPR md. 6(1)(b))',
                  'Hesap silinene kadar',
                ],
              ],
            },
          },
          'Kişisel veriler otomatik karar verme ya da profilleme için kullanılmaz.',
          'Onaylanan bir yorum ve verdiğin ad, yazının sayfasında herkese açık olur; onaylanmayan yorumlar silinir.',
        ],
      },
      {
        id: 'not-collected',
        title: 'Toplanmayanlar',
        blocks: [
          {
            list: [
              'Analitik ya da istatistik aracı yok, reklam yok.',
              'Başka şirketlere bilgi gönderen sosyal medya eklentisi ya da gömülü içerik yok.',
              'Fontlar ve diğer tüm dosyalar üçüncü taraf bir ağdan değil, bu sunucudan sunulur.',
              'Verilerin hiçbir şekilde satılmaz ya da kiralanmaz.',
            ],
          },
          'Diğer sitelere (GitHub, LinkedIn ve diğerleri) verilen bağlantılar düz bağlantılardır. Birine tıkladığında o sitenin kendi gizlilik politikası geçerli olur.',
        ],
      },
      {
        id: 'cookies',
        title: 'Çerezler',
        blocks: [
          'Çerez, tarayıcının bir site için sakladığı küçük bir dosyadır. tedem.dev şu çerezleri kullanır:',
          {
            table: {
              head: ['Ad', 'Tür', 'Amaç', 'Süre'],
              rows: [
                ['tedem_session', 'Zorunlu', 'Oturumunu (hesabın varsa girişini) sürdürür', '2 saat hareketsizlik'],
                ['XSRF-TOKEN', 'Zorunlu', 'Formları siteler arası sahte isteklere karşı korur', '2 saat hareketsizlik'],
                ['cookie_consent', 'Zorunlu', 'Çerez tercihini hatırlar', 'Yaklaşık 6 ay'],
                ['appearance', 'Tercih', 'Temanı hatırlar (yerel depolamada da tutulur)', '1 yıl'],
              ],
            },
          },
          'Site onlarsız çalışmadığı için zorunlu çerezler kapatılamaz. Tercih çerezi yalnızca rızanla kullanılır; rızanı istediğin zaman {cookieSettings} bölümünden verebilir ya da geri alabilirsin. Geri aldığında kayıtlı tema silinir.',
        ],
      },
      {
        id: 'sharing',
        title: 'Verilere başka kimler erişir',
        blocks: [
          {
            list: [
              'Barındırma: site, Google Cloud Platform üzerindeki bir sanal sunucuda çalışır; Google yukarıdaki verileri yalnızca bu sunucuyu çalıştırmak için işler.',
              'E-posta: gönderdiğin mesajlar e-posta sağlayıcımda saklanır.',
              'Resmi makamlar: yalnızca kanunen zorunlu olduğunda.',
            ],
          },
          'Bu sağlayıcılar verileri Türkiye dışında saklayabilir. Bu aktarımlar KVKK’nın 9. maddesinin ve uygulandığı durumlarda GDPR’ın V. bölümünün öngördüğü güvencelere, örneğin standart sözleşmelere dayanır.',
        ],
      },
      {
        id: 'security',
        title: 'Güvenlik',
        blocks: [
          'Site yalnızca HTTPS üzerinden sunulur. Parolalar özetlenerek saklanır, oturumlar şifrelenir, giriş ve kayıt denemeleri sınırlandırılır; hesaplarda iki adımlı doğrulama ve passkey kullanılabilir. Hiçbir sistem kusursuz değildir; bir sorun bulursan lütfen {email} adresine bildir.',
        ],
      },
      {
        id: 'rights',
        title: 'Hakların',
        blocks: [
          'KVKK’nın 11. maddesi ve uygulandığı durumlarda GDPR uyarınca:',
          {
            list: [
              'kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme;',
              'işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme;',
              'yurt içinde ya da yurt dışında aktarıldığı üçüncü kişileri bilme;',
              'eksik ya da yanlış işlenmişse düzeltilmesini, silinmesini ya da yok edilmesini isteme;',
              'bu düzeltme ve silme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme;',
              'yalnızca otomatik sistemlerle analiz edilmesi sonucu aleyhine bir sonuç çıkmasına itiraz etme;',
              'kanuna aykırı işleme nedeniyle zarara uğrarsan zararın giderilmesini talep etme;',
              'GDPR kapsamında ayrıca işlemenin kısıtlanmasını isteme, işlemeye itiraz etme, verilerini taşınabilir biçimde alma ve rızanı istediğin zaman geri alma haklarına sahipsin.',
            ],
          },
          'Başvurularını {email} adresine gönderebilirsin; ücretsiz ve en geç 30 gün içinde yanıtlanır. Ayrıca Kişisel Verileri Koruma Kurulu’na ya da AB’de bulunuyorsan kendi ülkendeki veri koruma otoritesine şikâyette bulunabilirsin.',
        ],
      },
      {
        id: 'children',
        title: 'Çocuklar',
        blocks: [
          'Site çocuklara yönelik değildir ve hesaplar 18 yaşından küçükler için tasarlanmamıştır. Bir çocuğun kişisel veri gönderdiğini düşünüyorsan {email} adresine yaz; veriler silinir.',
        ],
      },
      {
        id: 'changes',
        title: 'Bu politikadaki değişiklikler',
        blocks: [
          'Bu politika site değiştikçe güncellenir. En üstteki tarih son sürümü gösterir; önemli değişiklikler ayrıca bu sayfada belirtilir.',
        ],
      },
    ],
  },

  terms: {
    title: 'Kullanım Koşulları',
    description: 'tedem.dev’i kullanma kuralları: içerik sahipliği, kabul edilebilir kullanım, hesaplar ve sorumluluk.',
    path: 'koşullar',
    updated: '2026-11-28',
    summary: [
      'Siteyi okumak ücretsiz; lütfen adil kullan.',
      'Yazılar ve tasarım bana ait; alıntı yaparken bağlantı ver.',
      'Yazılardaki kod parçalarını kendi projelerinde kullanabilirsin.',
      'Her şey olduğu gibi, kişisel görüş olarak ve garantisiz paylaşılır.',
    ],
    sections: [
      {
        id: 'about',
        title: 'Bu koşullar hakkında',
        blocks: [
          'Bu koşullar, {owner} tarafından yürütülen tedem.dev ve tüm sayfaları (“site”) için geçerlidir. Siteyi kullanarak bu koşulları kabul etmiş olursun; kabul etmiyorsan lütfen siteyi kullanma.',
          'Kişisel verilerin nasıl işlendiğini anlatan {privacy} bu koşulların bir parçasıdır.',
        ],
      },
      {
        id: 'content',
        title: 'İçerik ve fikri haklar',
        blocks: [
          'Aksi belirtilmedikçe sitedeki yazılar, metinler, tasarım ve görseller {owner}’a aittir ve 5846 sayılı Fikir ve Sanat Eserleri Kanunu başta olmak üzere telif hukuku ile korunur.',
          {
            list: [
              'Kaynak göstererek ve özgün sayfaya bağlantı vererek kısa alıntılar yapabilirsin.',
              'Yazıların tamamını yeniden yayımlamak, çevirmek ya da ticari amaçla kullanmak yazılı izin gerektirir.',
              'Yazılardaki kod parçalarını, yazıda aksi belirtilmedikçe, kendi projelerinde ücretsiz ve garantisiz olarak kullanabilirsin.',
              'Diğer ürünlerin ad ve logoları sahiplerine aittir ve yalnızca onlara atıf için kullanılır.',
            ],
          },
        ],
      },
      {
        id: 'acceptable-use',
        title: 'Kabul edilebilir kullanım',
        blocks: [
          'Siteyi kullanırken şunları yapma:',
          {
            list: [
              'izinsiz olarak siteye sızmaya, işleyişini bozmaya ya da güvenliğini test etmeye çalışmak (güvenlik bildirimlerini {email} adresine memnuniyetle beklerim);',
              'sunucuyu yoran otomatik istekler göndermek ya da istek sınırlarını aşmaya çalışmak;',
              'toplu ya da otomatik yollarla hesap oluşturmak;',
              'içeriği insanları yanıltmak ya da kendini {owner} gibi göstermek için kullanmak.',
            ],
          },
          'Bu kurallara uymayanların erişimi engellenebilir.',
        ],
      },
      {
        id: 'accounts',
        title: 'Hesaplar',
        blocks: [
          'Yönetim paneli siteyi yönetmek için vardır; hesap oluşturmak içerik yayımlama hakkı vermez. Giriş bilgilerini güvende tutmak senin sorumluluğundadır. Bu koşullara uymayan ya da kullanılmayan hesaplar bildirim yapılmadan askıya alınabilir veya silinebilir.',
        ],
      },
      {
        id: 'comments',
        title: 'Yorumlar',
        blocks: [
          'Yorumlar yayımlanmadan önce incelenir; gerekçe gösterilmeden reddedilebilir ya da istendiği zaman kaldırılabilir. Yorum yazarken:',
          {
            list: [
              'saygılı ol ve yazının konusundan uzaklaşma;',
              'reklam, spam, hukuka aykırı içerik ya da başkalarının kişisel verilerini paylaşma;',
              'kendini başkası gibi gösterme.',
            ],
          },
          'Yazdıkların üzerindeki haklar sende kalır ve içeriğinden sen sorumlusun. Yorum göndererek, yorumunun verdiğin adla sitede gösterilmesine izin vermiş olursun. Yorumlarından birinin kaldırılmasını istersen {email} adresine yaz.',
        ],
      },
      {
        id: 'links',
        title: 'Diğer sitelere bağlantılar',
        blocks: [
          'Site, kolaylık olsun diye başka sitelere bağlantı verir. Bu siteler {owner}’ın kontrolünde değildir; içeriklerinden ve uygulamalarından {owner} sorumlu değildir.',
        ],
      },
      {
        id: 'warranty',
        title: 'Garanti yoktur',
        blocks: [
          'İçerik kişisel görüş ve deneyimdir, zamanla güncelliğini yitirebilir ve profesyonel tavsiye niteliği taşımaz. Site, doğru, eksiksiz ya da her zaman erişilebilir olduğuna dair hiçbir garanti verilmeden “olduğu gibi” ve “erişilebildiği ölçüde” sunulur.',
        ],
      },
      {
        id: 'liability',
        title: 'Sorumluluğun sınırlandırılması',
        blocks: [
          'Kanunun izin verdiği ölçüde {owner}, sitenin ya da içeriğinin kullanımından veya kullanılamamasından doğan zararlardan sorumlu değildir. Bu koşullardaki hiçbir hüküm, kasıt ya da ağır ihmal gibi kanunen sınırlandırılamayan sorumlulukları sınırlamaz.',
        ],
      },
      {
        id: 'changes',
        title: 'Bu koşullardaki değişiklikler',
        blocks: [
          'Bu koşullar güncellenebilir; en üstteki tarih son sürümü gösterir. Bir değişiklikten sonra siteyi kullanmaya devam etmen yeni sürümü kabul ettiğin anlamına gelir.',
        ],
      },
      {
        id: 'law',
        title: 'Uygulanacak hukuk',
        blocks: [
          'Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda, tüketici olarak sahip olduğun emredici haklar saklı kalmak kaydıyla, İstanbul mahkemeleri ve icra daireleri yetkilidir.',
        ],
      },
      {
        id: 'contact',
        title: 'İletişim',
        blocks: ['Bu koşullarla ilgili soruların için: {email}.'],
      },
    ],
  },
};

export default tr;
