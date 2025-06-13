const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

const currencyList = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

currencyList.forEach(currency => {
  let option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  fromCurrency.appendChild(option1);

  let option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || isNaN(amount)) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDiv.innerText = "Failed to fetch exchange rate.";
  }
}
