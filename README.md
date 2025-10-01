# AI-Powered Résumé & Portfolio Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-green)](https://openai.com/)

🌍 **[English](#english)** | **[Türkçe](#türkçe)**

---

## English

This project delivers an AI-assisted workflow for transforming a candidate's CV or LinkedIn profile into a polished single-page portfolio ready to download and share. The codebase is structured for rapid MVP delivery (Phase 1) with clear extension points for later phases (visual enhancements, UX improvements, growth features).

## Getting Started

### Prerequisites
- Node.js 18.17+ (includes `npm`).
- An OpenAI API key if you want to test live generations (otherwise the mock pipeline runs).

1. **Install dependencies**
  ```bash
  npm install
  ```
2. **Run the development server**
  ```bash
  npm run dev
  ```
3. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
.
├── app
│   ├── api
│   │   ├── generate/route.ts      # Direct JSON-to-portfolio API
│   │   └── upload/route.ts        # File/URL ingestion + job polling
│   ├── layout.tsx                 # Root layout & global styles
│   ├── page.tsx                   # Upload wizard + onboarding
│   └── preview/[slug]/page.tsx    # Sandboxed HTML preview
├── components
│   ├── ai/useGeneration.ts        # Client hook for polling job status
│   ├── onboarding/OnboardingStepper.tsx
│   ├── portfolio/PortfolioPreview.tsx
│   └── upload/*                   # Dropzone, forms, wizard steps
├── lib
│   ├── ai
│   │   ├── client.ts              # OpenAI client wrapper
│   │   ├── generate.ts            # Real AI orchestration
│   │   ├── mock.ts                # Deterministic fallback generator
│   │   ├── prompts.ts             # Prompt building blocks
│   │   └── schema.ts              # Zod schema for resume JSON
│   ├── data/jobs.ts               # In-memory job queue state
│   ├── parsing/extractor.ts       # Stubbed ingestion helpers
│   └── storage/storage.ts         # Ephemeral HTML storage
├── public
└── styles/globals.css
```

## Live AI generation

Set the `OPENAI_API_KEY` environment variable to switch from the mock generator to real-time OpenAI orchestration. When the key is present the upload API will:

1. Parse the raw résumé text into structured JSON (`lib/ai/schema.ts`).
2. Produce a concise professional summary.
3. Render a fully styled portfolio HTML document.
4. Store the HTML in the in-memory asset store (replace with S3/Supabase later).

If any OpenAI call fails, the pipeline automatically falls back to the deterministic mock generator so the user still receives a result.

## Phase Roadmap

- **Phase 1 – MVP**
  - CV/LinkedIn ingestion
  - AI parsing, summary, portfolio HTML generation
  - Downloadable file + share link
- **Phase 2 – Enhancements**
  - Multi-tone LinkedIn “About me” texts
  - Visual upgrades (timeline, skill bars, icons)
  - English/Turkish dual-language support
- **Phase 3 – UX**
  - Onboarding flow, inline editing, theme switching
- **Phase 4 – Growth**
  - Accounts, analytics, QR sharing, freemium model

## Configuration

Set the following environment variables (see `.env.example` for the latest list):

- `OPENAI_API_KEY` – primary AI provider key
- `OPENAI_MODEL` (optional) – default OpenAI model (defaults to `gpt-4o-mini`)
- `OPENAI_PARSER_MODEL`, `OPENAI_SUMMARY_MODEL`, `OPENAI_PORTFOLIO_MODEL` (optional overrides)
- `RESUME_STORAGE_BUCKET` – object storage bucket for generated assets
- `DATABASE_URL` – Postgres connection string

## Contributing

1. Create a feature branch.
2. Ensure `npm run lint` and `npm run test` pass.
3. Open a pull request describing your changes and the relevant phase/feature.

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

For security concerns, please review our [Security Policy](SECURITY.md).

---

## Türkçe

Bu proje, adayın CV'sini veya LinkedIn profilini yapay zeka yardımıyla parlak bir tek sayfalık portföye dönüştüren bir iş akışı sunar. Kodlar hızlı MVP teslimatı (Faz 1) için yapılandırılmış olup, sonraki fazlar (görsel iyileştirmeler, UX geliştirmeleri, büyüme özellikleri) için açık genişleme noktalarına sahiptir.

## Başlangıç

### Gereksinimler
- Node.js 18.17+ (`npm` dahil)
- Canlı AI üretimi test etmek için OpenAI API anahtarı (yoksa mock pipeline çalışır)

1. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

2. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

3. Uygulamayı görüntülemek için [http://localhost:3000](http://localhost:3000) adresini açın

## Proje Yapısı

```
.
├── app
│   ├── api
│   │   ├── generate/route.ts      # Doğrudan JSON-to-portfolio API
│   │   └── upload/route.ts        # Dosya/URL alımı + iş takibi
│   ├── layout.tsx                 # Kök layout ve global stiller
│   ├── page.tsx                   # Yükleme sihirbazı + onboarding
│   └── preview/[slug]/page.tsx    # İzole HTML önizleme
├── components
│   ├── ai/useGeneration.ts        # İş durumu polling için client hook
│   ├── onboarding/OnboardingStepper.tsx
│   ├── portfolio/PortfolioPreview.tsx
│   └── upload/*                   # Dropzone, formlar, wizard adımları
├── lib
│   ├── ai
│   │   ├── client.ts              # OpenAI client wrapper
│   │   ├── generate.ts            # Gerçek AI orkestrasyon
│   │   ├── mock.ts                # Deterministik fallback generator
│   │   ├── prompts.ts             # Prompt yapı taşları
│   │   └── schema.ts              # Özgeçmiş JSON için Zod şeması
│   ├── data/jobs.ts               # Bellek içi iş kuyruğu durumu
│   ├── parsing/extractor.ts       # Alım yardımcıları
│   └── storage/storage.ts         # Geçici HTML depolama
├── public
└── styles/globals.css
```

## Canlı AI Üretimi

`OPENAI_API_KEY` ortam değişkenini ayarlayarak mock generator'dan gerçek zamanlı OpenAI orkestrasyonuna geçiş yapabilirsiniz. Anahtar mevcut olduğunda upload API:

1. Ham özgeçmiş metnini yapılandırılmış JSON'a ayrıştırır (`lib/ai/schema.ts`)
2. Özlü bir profesyonel özet üretir
3. Tamamen stillendirilmiş bir portföy HTML belgesi oluşturur
4. HTML'i bellekteki asset deposunda saklar (daha sonra S3/Supabase ile değiştirilecek)

Herhangi bir OpenAI çağrısı başarısız olursa, pipeline otomatik olarak deterministik mock generator'a geri döner, böylece kullanıcı yine de bir sonuç alır.

## Faz Yol Haritası

- **Faz 1 – MVP**
  - CV/LinkedIn alımı
  - AI ayrıştırma, özet, portföy HTML üretimi
  - İndirilebilir dosya + paylaşım linki
- **Faz 2 – İyileştirmeler**
  - Çoklu ton LinkedIn "Hakkımda" metinleri
  - Görsel yükseltmeler (timeline, skill bars, iconlar)
  - İngilizce/Türkçe çift dil desteği
- **Faz 3 – UX**
  - Onboarding akışı, satır içi düzenleme, tema değiştirme
- **Faz 4 – Büyüme**
  - Hesaplar, analytics, QR paylaşımı, freemium model

## Yapılandırma

Aşağıdaki ortam değişkenlerini ayarlayın (en güncel liste için `.env.example`'a bakın):

- `OPENAI_API_KEY` – birincil AI sağlayıcı anahtarı
- `OPENAI_MODEL` (opsiyonel) – varsayılan OpenAI modeli (varsayılan `gpt-4o-mini`)
- `OPENAI_PARSER_MODEL`, `OPENAI_SUMMARY_MODEL`, `OPENAI_PORTFOLIO_MODEL` (opsiyonel geçersiz kılmalar)
- `RESUME_STORAGE_BUCKET` – üretilen varlıklar için nesne depolama kovası
- `DATABASE_URL` – Postgres bağlantı dizesi

## Katkıda Bulunma

1. Bir feature branch oluşturun
2. `npm run lint` ve `npm run test` komutlarının başarılı olduğundan emin olun
3. Değişikliklerinizi ve ilgili fazı/özelliği açıklayan bir pull request açın

Detaylı katkı kuralları için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## Güvenlik

Güvenlik endişeleri için lütfen [Güvenlik Politikamızı](SECURITY.md) inceleyin.

## 📞 Destek

- 🐛 **Hata Bildirimi:** [GitHub Issues](../../issues)
- 💡 **Özellik İsteği:** [Feature Request Template](../../issues/new?template=feature_request.md)
- 📖 **Dokümantasyon:** [Project Wiki](../../wiki)
- 🚀 **GitHub'a Yükleme:** [GITHUB_SETUP.md](GITHUB_SETUP.md)
- 📋 **Proje Özeti:** [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
