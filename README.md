# Zakaat Calculator

A modern, scholarly-grounded web application to help Muslims calculate their annual Zakaat obligation with precision and ease.

## 🌟 Features

- **Live Zakaat Calculation** - Real-time calculations as you type
- **Multi-Currency Support** - 8 currencies with dynamic symbol display
- **Privacy-First** - All data stored locally in your browser only
- **Scholarly Grounded** - Based on Qur'an, Hadith, and classical Fiqh
- **Mobile Responsive** - Beautiful UI on all devices
- **Accessible** - WCAG compliant forms and navigation

## 🚀 Current Status: Phase 2 Complete

### ✅ Phase 1: Scaffolding (Complete)
- React + Vite + TypeScript setup
- TailwindCSS v4 styling
- Framer Motion animations
- React Router SPA navigation
- 7 pages (Home, Calculate, FAQs, About, Contact, Donate, References)

### ✅ Phase 2: Bug Fixes + Calculation Engine (Complete)
- Fixed all 11 identified bugs
- Implemented full Zakaat calculation logic
- Added localStorage persistence
- Dynamic currency symbols
- Centralized layout architecture
- Trust & verification disclaimers

### 🔜 Phase 3: API Integration (Planned)
- Live gold/silver price feeds
- Contact form backend
- Payment gateway for donations
- Multi-language support

## 📦 Installation

```bash
# Clone repository
git clone <repository-url>
cd zakaat-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🧮 Calculation Methodology

- **Nisaab Threshold:** Lower of 85g gold or 595g silver value
- **Zakaat Rate:** 2.5% (1/40th) of net zakatable wealth
- **Default Standard:** Hanafi silver Nisaab
- **Assets Included:** Cash, gold, silver, stocks, crypto, business inventory, receivables
- **Deductions:** Short-term debts and immediate bills

See [References page](src/constants/content.ts) for full scholarly citations.

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Navbar, Footer, PageLayout)
│   └── ui/              # Reusable UI components (Button, Card, etc.)
├── constants/
│   ├── content.ts       # All user-facing text
│   └── layout.ts        # Layout constants
├── pages/               # Route pages
├── routes/              # Route configuration
├── utils/
│   ├── cn.ts            # Tailwind utility
│   ├── currency.ts      # Currency mappings
│   └── zakaat.ts        # Core calculation engine
├── App.tsx
└── main.tsx
```

## 🔧 Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS v4** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **localStorage** - Client-side persistence

## 📚 Documentation

- [QUICK_START.md](QUICK_START.md) - Get started developing
- [PHASE_2_SUMMARY.md](PHASE_2_SUMMARY.md) - What changed in Phase 2
- [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) - Future API enhancements
- [PERFORMANCE_NOTES.md](PERFORMANCE_NOTES.md) - Optimization tasks

## 🧪 Testing the Calculator

1. Navigate to `/calculate`
2. Select your currency (GBP, USD, EUR, etc.)
3. Enter your assets - watch live calculation in sidebar
4. Values persist on page reload (localStorage)
5. Click Reset to clear all data

### Example Test Values:
```
Cash: £10,000
Gold: 100 grams (@ £50/g = £5,000)
Stocks: £15,000
Total Assets: £30,000
Nisaab: £357 (595g silver @ £0.60/g)
Zakaat Due: £750 (2.5% of £30,000)
```

## 🔒 Privacy & Data

- **No backend** - All calculations happen in your browser
- **No tracking** - No analytics or cookies
- **localStorage only** - Data never leaves your device
- **Reset anytime** - Clear all data with one click

## ⚠️ Pending Tasks

### Critical:
- [ ] Optimize hero-pattern.png (1.9MB → <20KB)

### High Priority:
- [ ] Integrate live gold/silver price API
- [ ] Connect contact form backend
- [ ] Review vite-plugin-singlefile necessity

### Future Enhancements:
- [ ] Manual Nisaab price override
- [ ] Gold vs. silver standard toggle
- [ ] Multi-language support (Arabic, Urdu, etc.)
- [ ] RTL layout support
- [ ] PDF report generation
- [ ] Email reminder for next Zakaat date

## 🤝 Contributing

This is a community project. Contributions welcome:

1. **Scholarly Review** - Verify citations and rulings
2. **Code** - Bug fixes, features, optimizations
3. **Design** - UI/UX improvements
4. **Content** - Translations, FAQs, educational material

## 📄 License

[Specify license]

## 📧 Contact

For questions, corrections, or scholarly review:
- Email: hello@zakaatcalculator.app
- See `/contact` page in app

## 🙏 Acknowledgments

Built with the intention of making Zakaat calculation accessible and accurate for Muslims worldwide. May Allah accept this effort and make it a means of benefit.

---

**Note:** This calculator is for educational purposes. For personal Zakaat queries, please consult a qualified Islamic scholar.
