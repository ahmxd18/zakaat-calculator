# API Integration Guide (Future Enhancement)

## Current Status
The Zakaat calculator currently uses **hardcoded Nisaab prices**:
- Gold: £50/gram
- Silver: £0.60/gram

These are example values in the `Calculate.tsx` component.

---

## Recommended Enhancement: Live Metal Prices

### Option 1: Metals-API (Recommended)
**Website:** https://metals-api.com/

**Pricing:**
- Free tier: 50 requests/month
- Basic: $15/month for 5,000 requests

**API Example:**
```typescript
// Example endpoint
GET https://metals-api.com/api/latest?access_key=YOUR_KEY&base=GBP&symbols=XAU,XAG

// Response structure
{
  "success": true,
  "timestamp": 1234567890,
  "base": "GBP",
  "date": "2024-01-15",
  "rates": {
    "XAU": 0.0004562,  // 1 GBP = 0.0004562 troy oz of gold
    "XAG": 0.0324      // 1 GBP = 0.0324 troy oz of silver
  }
}

// Conversion to per-gram prices:
// 1 troy oz = 31.1035 grams
// Gold price per gram = 1 / (rate * 31.1035)
// Silver price per gram = 1 / (rate * 31.1035)
```

### Option 2: GoldAPI.io
**Website:** https://www.goldapi.io/

**Pricing:**
- Free tier: 5,000 requests/month
- Pro: $9.99/month

**API Example:**
```typescript
GET https://www.goldapi.io/api/XAU/GBP

// Response structure
{
  "timestamp": 1234567890,
  "metal": "XAU",
  "currency": "GBP",
  "price": 1567.23,  // Price per troy oz
  "price_gram": 50.39 // Price per gram (convenient!)
}
```

---

## Implementation Steps

### 1. Install React Query
```bash
npm install @tanstack/react-query
```

### 2. Create API Service
```typescript
// src/services/metalPrices.ts
export async function fetchMetalPrices(currency: string) {
  const response = await fetch(
    `https://www.goldapi.io/api/XAU/${currency}`,
    {
      headers: {
        'x-access-token': import.meta.env.VITE_GOLD_API_KEY
      }
    }
  );
  
  const gold = await response.json();
  
  const silverResponse = await fetch(
    `https://www.goldapi.io/api/XAG/${currency}`,
    {
      headers: {
        'x-access-token': import.meta.env.VITE_GOLD_API_KEY
      }
    }
  );
  
  const silver = await silverResponse.json();
  
  return {
    goldPricePerGram: gold.price_gram,
    silverPricePerGram: silver.price_gram,
  };
}
```

### 3. Update Calculate.tsx
```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchMetalPrices } from '../services/metalPrices';

export function Calculate() {
  const [currency, setCurrency] = useState("GBP");
  
  // Replace hardcoded prices with API fetch
  const { data: nisaabPrices, isLoading } = useQuery({
    queryKey: ['metalPrices', currency],
    queryFn: () => fetchMetalPrices(currency),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
  
  // Fallback to defaults while loading
  const prices = nisaabPrices || {
    goldPricePerGram: 50,
    silverPricePerGram: 0.6,
  };
  
  // Rest of component...
}
```

### 4. Add Loading State
```typescript
{isLoading && (
  <div className="rounded-xl bg-sage-50 border border-sage-200 p-4">
    <p className="text-xs text-sage-700">
      Fetching current gold/silver prices...
    </p>
  </div>
)}
```

### 5. Display Current Prices
```typescript
<div className="text-xs text-charcoal-400 space-y-1">
  <p>Current prices (updated hourly):</p>
  <p>Gold: {formatCurrency(prices.goldPricePerGram)}/gram</p>
  <p>Silver: {formatCurrency(prices.silverPricePerGram)}/gram</p>
</div>
```

---

## Environment Variables

Create `.env` file:
```bash
VITE_GOLD_API_KEY=your_api_key_here
```

Add to `.gitignore`:
```
.env
.env.local
```

---

## Caching Strategy

- **Cache duration:** 1 hour (prices don't change that frequently)
- **Stale-while-revalidate:** Show cached data immediately, fetch update in background
- **Fallback:** If API fails, use last known cached values
- **Manual refresh button:** Allow users to force refresh prices

---

## Multi-Currency FX Conversion (Optional)

If you want users to mix currencies (e.g., enter assets in USD but calculate in GBP):

### Option: Exchange Rates API
**Website:** https://exchangeratesapi.io/

```typescript
// Fetch exchange rates
const rates = await fetch(
  `https://api.exchangeratesapi.io/latest?base=GBP&symbols=USD,EUR,AED,SAR,PKR,BDT,MYR`
);

// Convert any currency to base currency
function convertToBase(amount: number, fromCurrency: string) {
  if (fromCurrency === 'GBP') return amount;
  return amount / rates[fromCurrency];
}
```

**Recommendation:** Only implement if explicitly needed. Current approach (user enters all values in chosen currency) is simpler and less error-prone.

---

## Manual Price Override

Consider adding a toggle for users to manually override Nisaab prices:

```typescript
const [useManualPrices, setUseManualPrices] = useState(false);
const [manualPrices, setManualPrices] = useState({ gold: 50, silver: 0.6 });

const effectivePrices = useManualPrices 
  ? { goldPricePerGram: manualPrices.gold, silverPricePerGram: manualPrices.silver }
  : nisaabPrices;
```

This is useful for:
- Users in regions with different local gold/silver prices
- Scholars who want to use specific Nisaab values
- Testing different scenarios

---

## Nisaab Display Preference

Add a toggle for gold vs. silver Nisaab display:

```typescript
const [nisaabStandard, setNisaabStandard] = useState<'silver' | 'gold' | 'lower'>('lower');

// In calculation:
const nisaabThreshold = 
  nisaabStandard === 'gold' ? goldNisaab :
  nisaabStandard === 'silver' ? silverNisaab :
  Math.min(goldNisaab, silverNisaab); // 'lower' (default)
```

This respects scholarly differences:
- Hanafi school: Typically uses silver standard
- Shafi'i school: Typically uses gold standard
- Conservative approach: Use lower of the two (current implementation)
