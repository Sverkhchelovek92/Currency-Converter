// DOM Elements
const amountInput = document.getElementById('amount') as HTMLInputElement
const fromSelect = document.getElementById('from') as HTMLSelectElement
const toSelect = document.getElementById('to') as HTMLSelectElement
const resultPar = document.getElementById('result') as HTMLParagraphElement
const btn = document.getElementById('convertBtn') as HTMLButtonElement

interface ExchangeRates {
  [key: string]: number
}

interface ExchangeAPIResponse {
  base: string
  rates: {
    [key: string]: number
  }
}

async function fetchRates(base: string = 'USD'): Promise<ExchangeRates> {
  const url = `https://api.frankfurter.app/latest?from=${base}`

  const response = await fetch(url)
  const data: ExchangeAPIResponse = await response.json()

  return data.rates
}

// const rates: ExchangeRates = {
//   USD: 1,
//   EUR: 0.93,
//   GBP: 0.81,
//   JPY: 148.5,
//   RUB: 108.7,
// }

let rates: ExchangeRates = {}

async function init() {
  rates = await fetchRates()
  console.log('Rates updated:', rates)
  btn.disabled = false
}

init()

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

btn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value)
  if (isNaN(amount)) {
    resultPar.textContent = 'Please enter the correct amount!'
    return
  }

  const from = fromSelect.value
  const to = toSelect.value

  const result = convert(amount, from, to, rates)

  if (result !== null) {
    resultPar.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`
  }
})
