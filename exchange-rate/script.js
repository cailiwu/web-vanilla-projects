const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// Fecth exchane rates and update the DOM

function caculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  console.log(currency_one, currency_two);
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
}

// event listener
currencyEl_two.addEventListener('change', caculate);
amountEl_one.addEventListener('input', caculate);
currencyEl_one.addEventListener('change', caculate);
amountEl_two.addEventListener('input', caculate);




swap.addEventListener('click', ()=> {
  const temp = currencyEl_one.value;
  console.log('temp', temp);
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caculate();
})

caculate();