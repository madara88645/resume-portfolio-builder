# GitHub'a Yükleme Rehberi / GitHub Upload Guide

## 🇹🇷 Türkçe

### Adım 1: Git Kullanıcı Bilgilerini Ayarlayın

Terminalda şu komutları çalıştırın (kendi bilgilerinizle değiştirin):

```powershell
git config --global user.name "GitHub Kullanıcı Adınız"
git config --global user.email "github-email@example.com"
```

### Adım 2: İlk Commit'i Yapın

```powershell
git commit -m "Initial commit: AI-Powered Resume & Portfolio Builder"
```

### Adım 3: GitHub'da Yeni Bir Repository Oluşturun

1. [GitHub](https://github.com) hesabınıza giriş yapın
2. Sağ üst köşedeki **+** butonuna tıklayın
3. **New repository** seçeneğini seçin
4. Repository adı girin (örn: `resume-portfolio-builder`)
5. İsteğe bağlı bir açıklama ekleyin
6. **Public** veya **Private** seçin
7. **README, .gitignore veya license** eklemeyin (zaten projenizde var)
8. **Create repository** butonuna tıklayın

### Adım 4: GitHub Repository'sini Bağlayın ve Push Yapın

GitHub'da yeni oluşturduğunuz repository sayfasında gösterilen komutları kullanın:

```powershell
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADI.git
git push -u origin main
```

**Örnek:**
```powershell
git remote add origin https://github.com/johndoe/resume-portfolio-builder.git
git push -u origin main
```

### Adım 5: Ortam Değişkenlerini Ayarlayın (Opsiyonel)

Eğer GitHub Actions CI/CD kullanmak isterseniz:

1. GitHub repository'nizde **Settings** > **Secrets and variables** > **Actions** bölümüne gidin
2. **New repository secret** butonuna tıklayın
3. `OPENAI_API_KEY` adıyla OpenAI API anahtarınızı ekleyin

---

## 🇬🇧 English

### Step 1: Set Up Git User Information

Run these commands in the terminal (replace with your information):

```powershell
git config --global user.name "Your GitHub Username"
git config --global user.email "your-github-email@example.com"
```

### Step 2: Make the Initial Commit

```powershell
git commit -m "Initial commit: AI-Powered Resume & Portfolio Builder"
```

### Step 3: Create a New Repository on GitHub

1. Log in to your [GitHub](https://github.com) account
2. Click the **+** button in the top right corner
3. Select **New repository**
4. Enter a repository name (e.g., `resume-portfolio-builder`)
5. Add an optional description
6. Choose **Public** or **Private**
7. Do **NOT** add README, .gitignore, or license (you already have them)
8. Click **Create repository**

### Step 4: Connect and Push to GitHub Repository

Use the commands shown on your newly created repository page on GitHub:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/johndoe/resume-portfolio-builder.git
git push -u origin main
```

### Step 5: Set Up Environment Variables (Optional)

If you want to use GitHub Actions CI/CD:

1. Go to your GitHub repository's **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Add your OpenAI API key with the name `OPENAI_API_KEY`

---

## 📋 Oluşturulan Dosyalar / Created Files

Bu repo hazırlığı sırasında aşağıdaki dosyalar eklendi:

- ✅ `LICENSE` - MIT License
- ✅ `CONTRIBUTING.md` - Katkıda bulunma rehberi
- ✅ `SECURITY.md` - Güvenlik politikası
- ✅ `.gitattributes` - Git dosya ayarları
- ✅ `.github/workflows/ci.yml` - CI/CD pipeline
- ✅ `.github/ISSUE_TEMPLATE/` - Issue şablonları
- ✅ `.github/PULL_REQUEST_TEMPLATE.md` - PR şablonu

## 🚀 Sonraki Adımlar / Next Steps

1. Yerel geliştirme ortamını test edin:
   ```powershell
   npm install
   npm run dev
   ```

2. `.env.local` dosyası oluşturun ve API anahtarlarınızı ekleyin:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

3. Projeyi GitHub'a yükledikten sonra:
   - Repository açıklamasını güncelleyin
   - Topics ekleyin (nextjs, ai, resume, portfolio, typescript)
   - GitHub Pages veya Vercel'de deploy edin

## 📞 Yardım / Help

Herhangi bir sorunla karşılaşırsanız:
- GitHub Issues kullanarak sorun bildirin
- CONTRIBUTING.md dosyasını okuyun
- Topluluk forumlarından yardım isteyin

---

**Not:** API anahtarlarınızı asla commit etmeyin! `.env` dosyaları `.gitignore` içinde bulunmaktadır.
