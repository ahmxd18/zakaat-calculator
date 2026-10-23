/**
 * Select.tsx
 * Reusable styled select/dropdown component.
 * Matches the project's design system (rounded-xl, cream-300 border, sage focus ring).
 *
 * Usage:
 *   <Select
 *     name="currency"
 *     value={currency}
 *     onChange={(val) => setCurrency(val)}
 *     options={[{ value: "GBP", label: "GBP" }, ...]}
 *     placeholder="Select currency"
 *   />
 */
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../utils/cn"

export interface SelectOption {
  value: string
  label: string
  /** Optional decorative prefix (e.g. an emoji or a short flag string) */
  prefix?: string
}

export interface SelectProps {
  /** HTML name attribute */
  name?: string
  /** Controlled value */
  value: string
  /** Called with the new value string on every change */
  onChange: (value: string) => void
  /** The list of options */
  options: SelectOption[]
  /** Accessible label — shown as a disabled first option when value is empty */
  placeholder?: string
  /** Accessible aria-label for the select element */
  ariaLabel?: string
  /** Additional class names applied to the <select> */
  className?: string
  /** Disable the select */
  disabled?: boolean
  /** Size variant */
  size?: "sm" | "md" | "lg"
}

const SIZE_CLASSES: Record<NonNullable<SelectProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
}

export function Select({
  name,
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
  className,
  disabled = false,
  size = "md",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span className="relative inline-flex">
      <select
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setIsOpen(false)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onPointerDown={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false)
          else if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) setIsOpen(true)
        }}
        disabled={disabled}
        aria-label={ariaLabel ?? placeholder}
        className={cn(
          "rounded-xl border border-cream-300 bg-white text-charcoal-800",
          "focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-shadow appearance-none cursor-pointer pe-9",
          SIZE_CLASSES[size],
          className,
        )}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.prefix ? `${opt.prefix} ${opt.label}` : opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-500 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
      />
    </span>
  )
}
