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
  const url = `https://api.exchangerate-api.com/v4/latest/${base}`

  const response = await fetch(url)
  const data: ExchangeAPIResponse = await response.json()

  return data.rates
}

let rates: ExchangeRates = {}

async function init() {
  rates = await fetchRates()
  console.log('Rates updated:', rates)

  fillCurrencySelects(rates)

  btn.disabled = false
}

init()

function fillCurrencySelects(rates: ExchangeRates) {
  const currencies = Object.keys(rates).sort()

  currencies.forEach((cur) => {
    const optionFrom = document.createElement('option')

    optionFrom.value = cur
    optionFrom.textContent = cur

    const optionTo = optionFrom.cloneNode(true) as HTMLOptionElement

    fromSelect.appendChild(optionFrom)
    toSelect.appendChild(optionTo)
  })

  fromSelect.value = 'USD'
  toSelect.value = 'EUR'
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
