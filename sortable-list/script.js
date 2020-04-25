const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');
console.log(draggable_list)
let listItems = [];
let dragStartIndex = '';
const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];
createList();
addEventListeners();

function createList () {
  [...richestPeople]
  .map(a => ({ value: a, sort: Math.random()}))
  .sort((a, b) => a.sort - b.sort)
  .map (a => a.value)
  .forEach((person, index) => {
    const listItem = document.createElement('li')
    listItem.setAttribute('data-index', index)
    listItem.innerHTML = `
      <span class="number"> ${index + 1}</span>
      <div class="draggable" draggable="true"
        <p class="person-name">${person}<p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;
    listItems.push(listItem);
    draggable_list.appendChild(listItem);
  })
}

function dragStart (e) {
  console.log(e.target)
  // console.log('start', this)
  console.log('Event:', 'dragStart');
  dragStartIndex = +this.closest('li').getAttribute('data-index')
  
}

function dragEnter () {
  console.log('enter...',this)
  this.classList.add('over');
  console.log('Event:', 'dragEnter');
}

function dragLeave () {
  this.classList.remove('over')
  console.log('Event:', 'dragLeave');
}

function dragOver (e) {
  e.preventDefault();
  console.log('Event:', 'dragOver');
}
function dragDrop () {
  // console.log(this)
  const dragEndIndex = +this.getAttribute('data-index');
  swapItem(dragStartIndex, dragEndIndex);
  console.log('Event:', 'dragDrop');
  this.classList.remove('over')
}
 function swapItem(dragFromIndex, gragToindex) {
   const itemOne = listItems[dragFromIndex].querySelector('.draggable');
   const itemTwo = listItems[gragToindex].querySelector('.draggable');
   listItems[dragFromIndex].appendChild(itemTwo);
   listItems[gragToindex].appendChild(itemOne);
 }


function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    // source
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    // container
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}