import Holder from "../layout/holder";

import realDate from "../../lib/realDate";

export default function About() {
  return (
    <section id="about">
      <Holder>
        <div className="py-8 space-y-8">
          <div className="space-y-4">
            <h2>
              <a className="text-2xl font-medium text-indigo-300" href="#about">
                Hakkımda
              </a>
            </h2>
            <p className="text-sm">
              Medet Erdal kimdir? Kendisi, işi ve becerileri hakkında
              bilgiler...
            </p>
          </div>
          <div>
            <p>
              {realDate("1997/01/01")} yaşındayım,{" "}
              <u title="İstanbul, Turkey">İstanbul</u>
              'da yaşıyorum. Bir <u>full-stack</u> geliştiriciyim ve{" "}
              {realDate("2013/01/01")} yıldır alanımda kendimi geliştirerek
              çalışıyorum. Genellikle JavaScript ve PHP kullanıyorum. Sürekli
              değişiklik gösteriyor olsa da şu anda ilgi alanım React, Angular,
              Vue.js, Node.js, Gatsby, Next.js, PHP ve Kotlin. UI / UX çalışmayı
              da çok sevdiğimi kesinlikle belirtmem gerekiyor. Şimdilik{" "}
              <u>freelance</u> olarak çalışmayı tercih ediyorum.
            </p>
          </div>
        </div>
      </Holder>
    </section>
  );
}
