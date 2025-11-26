// DOM Elements
const amountInput = document.getElementById('amount') as HTMLInputElement
const fromInput = document.getElementById('from') as HTMLInputElement
const toInput = document.getElementById('to') as HTMLInputElement
const resultPar = document.getElementById('result') as HTMLParagraphElement
const btn = document.getElementById('convertBtn') as HTMLButtonElement

interface ExchangeRates {
  [key: string]: number
}

const rates: ExchangeRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.81,
  JPY: 148.5,
  RUB: 108.7,
}

function convert(
  amount: number,
  from: string,
  to: string,
  rates: ExchangeRates
): number | null {
  const fromRate = rates[from.toUpperCase()]
  const toRate = rates[to.toUpperCase()]

  if (!fromRate || !toRate) {
    alert('Wrong currency')
    return null
  }

  const usdAmount = amount / fromRate
  return usdAmount * toRate
}
