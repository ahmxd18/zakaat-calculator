/**
 * AssetField.tsx
 * A single currency number input with a floating symbol prefix/suffix.
 */
import { useState, useEffect } from "react"
import { MAX_INPUT } from "../../utils/zakaat"
import { cn } from "../../utils/cn"

export interface AssetFieldProps {
  id: string
  label: string
  placeholder: string
  currencySymbol: string
  value: number
  onChange: (value: number) => void
  onValidityChange?: (valid: boolean) => void
  invalidMessage?: string
  direction: "ltr" | "rtl"
}

export function AssetField({
  id,
  label,
  placeholder,
  currencySymbol,
  value,
  onChange,
  direction,
  onValidityChange,
  invalidMessage,
}: AssetFieldProps) {
  const [draft, setDraft] = useState(value ? String(value) : "")
  const [invalid, setInvalid] = useState(false)
  useEffect(() => { setDraft(value ? String(value) : "") }, [value])
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal-700"
      >
        {label}
      </label>
      <div className="relative">
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-charcoal-400 text-sm select-none",
            direction === "rtl" ? "end-3.5" : "start-3.5",
          )}
        >
          {currencySymbol}
        </span>
        <input
          id={id}
          type="number"
          min="0"
          max={MAX_INPUT}
          step="any"
          placeholder={placeholder}
          value={draft}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          onChange={(e) => {
            const input = e.currentTarget
            setDraft(input.value)
            const valid = input.checkValidity() && !input.validity.badInput && (input.value === "" || Number.isFinite(input.valueAsNumber))
            setInvalid(!valid)
            onValidityChange?.(valid)
            if (valid) onChange(input.value === "" ? 0 : input.valueAsNumber)
          }}
          className={cn(
            "w-full rounded-xl border border-cream-300 bg-white py-3 text-sm text-charcoal-800",
            "placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400",
            "focus:border-transparent transition-shadow",
            direction === "rtl" ? "pe-8 ps-4" : "ps-8 pe-4",
          )}
        />
      </div>
      {invalid && <p id={`${id}-error`} role="alert" className="text-xs text-blush-700">{invalidMessage ?? "Enter a valid non-negative amount within the supported range."}</p>}
    </div>
  )
}
