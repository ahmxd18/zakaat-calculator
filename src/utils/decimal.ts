/** Exact base-10 arithmetic for eligibility decisions; round only for display. */
export type Decimal = { n: bigint; d: bigint }
export function decimal(value: number): Decimal {
  if (!Number.isFinite(value)) throw new Error("A finite number is required.")
  const [digits, exponent = "0"] = value.toString().toLowerCase().split("e")
  const places = (digits.split(".")[1]?.length ?? 0) - Number(exponent)
  const n = BigInt(digits.replace(".", ""))
  return places >= 0 ? { n, d: 10n ** BigInt(places) } : { n: n * 10n ** BigInt(-places), d: 1n }
}
export const add = (a: Decimal, b: Decimal): Decimal => ({ n: a.n*b.d + b.n*a.d, d: a.d*b.d })
export const subtract = (a: Decimal, b: Decimal): Decimal => ({ n: a.n*b.d - b.n*a.d, d: a.d*b.d })
export const multiply = (a: Decimal, b: Decimal): Decimal => ({ n: a.n*b.n, d: a.d*b.d })
export const lessThan = (a: Decimal, b: Decimal) => a.n*b.d < b.n*a.d
export const sum = (items: Decimal[]) => items.reduce(add, decimal(0))
export function toNumber(a: Decimal): number {
  if (a.n === 0n) return 0
  const negative = a.n < 0n
  const numerator = negative ? -a.n : a.n
  // Retain twenty significant decimal digits before the final Number conversion.
  // Scaling is done with BigInt, including for subnormal input numbers.
  const scale = 20 + a.d.toString().length - numerator.toString().length
  const digits = scale >= 0
    ? numerator * 10n ** BigInt(scale) / a.d
    : numerator / (a.d * 10n ** BigInt(-scale))
  const result = Number(`${negative ? "-" : ""}${digits}e${-scale}`)
  if (!Number.isFinite(result) || Math.abs(result) > 1e14) throw new Error("Calculation exceeds the supported range.")
  return result
}
