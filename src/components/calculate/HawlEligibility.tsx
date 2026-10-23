export interface HawlEligibilityProps {
  startDate: string
  fellBelowNisaab: boolean
  onStartDateChange: (value: string) => void
  onFellBelowNisaabChange: (value: boolean) => void
  labels: {
    title: string
    description: string
    startDate: string
    dippedBelowNisaab: string
    hanafiNote: string
  }
  madhab: "hanafi" | "maliki" | "shafii" | "hanbali"
}

export function HawlEligibility({
  startDate,
  fellBelowNisaab,
  onStartDateChange,
  onFellBelowNisaabChange,
  labels,
  madhab,
}: HawlEligibilityProps) {
  const today = new Date()
  const maxDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-")

  return (
    <div className="space-y-3 rounded-xl border border-cream-200 bg-cream-50 p-4">
      <div>
        <p className="text-sm font-semibold text-charcoal-700">{labels.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-charcoal-500">
          {labels.description}
        </p>
      </div>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-charcoal-600">{labels.startDate}</span>
        <input
          type="date"
          value={startDate}
          max={maxDate}
          onChange={(event) => onStartDateChange(event.target.value)}
          className="w-full rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-400"
        />
      </label>
      <label className="flex items-start gap-2 text-xs leading-relaxed text-charcoal-600">
        <input
          type="checkbox"
          checked={fellBelowNisaab}
          onChange={(event) => onFellBelowNisaabChange(event.target.checked)}
          className="mt-0.5 accent-sage-600"
        />
        <span>{labels.dippedBelowNisaab}</span>
      </label>
      {madhab === "hanafi" && (
        <p className="text-xs leading-relaxed text-charcoal-500">{labels.hanafiNote}</p>
      )}
    </div>
  )
}
