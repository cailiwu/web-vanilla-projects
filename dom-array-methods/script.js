const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const caculateWealthBtn = document.getElementById('caculate-wealth');

let data = [];

// Fetch random user and add money

async function getRandomUser () {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json();
  console.log(data);
  const user = data.results[0];
  const newUser = {
    name:`${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

// Add new Obj to data arr
function addData(user) {
  data.push(user);
  updateDOM();
}
// Update DOM
function updateDOM(provideData = data) {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  provideData.forEach(item => {
    console.log(item);
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  })
}

// format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  })
  updateDOM();
}

function sortByRichest () {
  console.log(123);
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}


function showMillionaires () {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

function caculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}
// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
caculateWealthBtn.addEventListener('click', caculateWealth);


