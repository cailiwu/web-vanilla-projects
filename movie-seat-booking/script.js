/**
 * Element.classList https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList
 */
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
console.log([...seats]);
// array like to pure array
// https://kanboo.github.io/2018/01/26/ES6-SpreadOperator-RestOperator/

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = movieSelect.value;
console.log(ticketPrice);
populateUI();

// save selected movie incex and price
function setMovieData (movieIndex, moviePrice) {
  localStorage.setItem('selectMovieIndex', movieIndex);
  localStorage.setItem('selectMoviePrice', moviePrice);
}

// Update total and count and store selected seat index
function updateSelectedCount () {
  const selectdSeats = document.querySelectorAll('.row .seat.selected');
  // use spread operator to arr
  const selectedIndex = [...selectdSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeat', JSON.stringify(selectedIndex));
  const selectedSeatsCount = selectdSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Listener for select change
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
  setMovieData(e.target.selectedIndex, e.target.value);
});


// Listener for click seat
container.addEventListener('click', (e) => {
  console.log(e);
  console.log(e.target);
  const target = e.target;
  console.log(target.classList);
  if (target.classList.contains('seat') && !target.classList.contains('occupied')) {
    target.classList.toggle('selected');
    // Update UI count
    updateSelectedCount();
  }
})

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeat'));
  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }
  const selectedMovieIndex = localStorage.getItem('selectMovieIndex');
  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Initial select count and total seat
updateSelectedCount();
