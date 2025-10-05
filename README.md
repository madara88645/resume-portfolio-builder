<div align="center">

# 🤖 AI-Powered Resume & Portfolio Builder

### Transform your CV into a stunning portfolio in seconds with AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green)](https://openai.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/madara88645/resume-portfolio-builder/pulls)

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 🌟 Features

- 📄 **Multi-Format Support** - Upload PDF, DOCX, or TXT resumes
- 🤖 **AI-Powered Parsing** - Intelligent data extraction using OpenAI
- 🎨 **Beautiful Portfolios** - Generate polished single-page portfolios
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🎯 **Sample Resumes** - Test with pre-built professional examples
- ⬇️ **Easy Export** - Download as HTML or share via link
- 🔄 **Mock Mode** - Works without OpenAI API key for testing
- 🎭 **Multiple Themes** - Coming soon!

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ (includes npm)
- OpenAI API key (optional - mock mode available)

### Installation

```bash
# Clone the repository
git clone https://github.com/madara88645/resume-portfolio-builder.git
cd resume-portfolio-builder

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📖 How It Works

1. **Upload** - Drop your PDF/DOCX resume or paste LinkedIn URL
2. **AI Magic** - Our AI extracts and structures your information
3. **Generate** - Get a beautiful, professional portfolio in seconds
4. **Download** - Save as HTML or share via unique link

---

## 🎬 Demo

Try it with our sample resumes:
- 👨‍💻 Full-Stack Developer (8+ years)
- 📊 Digital Marketing Manager (MBA)

*Live demo: Coming soon on Vercel!*

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Headless UI](https://headlessui.com/)
- **Icons:** [Heroicons](https://heroicons.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend & AI
- **AI Provider:** [OpenAI GPT-4](https://openai.com/)
- **File Parsing:** 
  - PDF: [pdf-parse](https://www.npmjs.com/package/pdf-parse)
  - DOCX: [mammoth](https://www.npmjs.com/package/mammoth)
- **State Management:** [SWR](https://swr.vercel.app/)
- **Validation:** [Zod Schemas](https://zod.dev/)

### Development
- **Package Manager:** npm
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Build Tool:** Next.js built-in

---

## 📁 Project Structure

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

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file:

```env
# OpenAI Configuration (Optional)
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Optional overrides
OPENAI_PARSER_MODEL=gpt-4o-mini
OPENAI_SUMMARY_MODEL=gpt-4o-mini
OPENAI_PORTFOLIO_MODEL=gpt-4o-mini
```

See [`.env.example`](.env.example) for all options.

---

## 🚀 Deploy

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/madara88645/resume-portfolio-builder)

1. Click the button above
2. Add your `OPENAI_API_KEY` in Environment Variables
3. Deploy!

### Manual Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🗺️ Roadmap

### ✅ Phase 1 - MVP (Current)
- [x] Multi-format file upload (PDF, DOCX, TXT)
- [x] AI-powered parsing with OpenAI
- [x] Sample resume examples
- [x] HTML portfolio generation
- [x] Mock generator fallback

### 🔜 Phase 2 - Enhancements
- [ ] Multiple themes & templates
- [ ] LinkedIn text generator
- [ ] Visual timeline
- [ ] PDF export
- [ ] Multi-language (EN/TR)

### 🔜 Phase 3 - UX
- [ ] Inline editing
- [ ] Real-time preview
- [ ] Theme customization
- [ ] Dark mode

### 🔜 Phase 4 - Growth
- [ ] User accounts
- [ ] Analytics
- [ ] Social sharing
- [ ] Freemium model

## 🤝 Contributing

We love contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. ✨ Make your changes
4. ✅ Run `npm run lint` and `npm run build`
5. 📝 Commit your changes (`git commit -m 'Add amazing feature'`)
6. 🚀 Push to the branch (`git push origin feature/amazing-feature`)
7. 🎉 Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

### Good First Issues
Looking for something to work on? Check out issues labeled [`good first issue`](https://github.com/madara88645/resume-portfolio-builder/labels/good%20first%20issue)!

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Free to use for personal and commercial projects! ✨

---

## 🔒 Security

Found a security issue? Please review our [Security Policy](SECURITY.md) and report responsibly.

---

## 📞 Support & Community

- 🐛 [Report Bug](https://github.com/madara88645/resume-portfolio-builder/issues/new?template=bug_report.md)
- 💡 [Request Feature](https://github.com/madara88645/resume-portfolio-builder/issues/new?template=feature_request.md)
- 📖 [Documentation](https://github.com/madara88645/resume-portfolio-builder/wiki)
- ⭐ [Star on GitHub](https://github.com/madara88645/resume-portfolio-builder)

---

## 💖 Show Your Support

If this project helped you, please consider:
- ⭐ Starring the repository
- 🐦 Sharing on social media
- 💬 Telling your friends
- ☕ [Buying me a coffee](https://buymeacoffee.com/madara88645) (optional)

---

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
