const toggle = document.getElementById('toogle');
const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');

// Toggle navigation
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'))

// Open modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal

close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
modal.addEventListener('click', e => {
  console.log(e.target);
  if (e.target === modal) {
    modal.classList.remove('show-modal');
  }
})