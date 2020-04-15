const postContainer = document.getElementById('posts-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;

// Fetch postd from api

async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// Show posts in DOM

async function showPosts() {
  const posts = await getPosts();
  console.log(posts);
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <h2 class="post-title">${post.title}</h2>
    <p class="post-content">${post.body}</p>
    </div>
    `
    postContainer.appendChild(postEl);
  });
}
// Show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      page ++;
      showPosts();
    }, 300);
  }, 1000);
}

// Show fileter posts by input
function showFilterPost (e) {
  const item = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-content').innerText.toUpperCase();
    if (title.indexOf(item) > -1 || body.indexOf(item) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }

  })
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  // https://emn178.pixnet.net/blog/post/95137696
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    console.log('scrollTop', scrollTop);
    console.log('scrollHeight', scrollHeight);
    console.log('clientHeight', clientHeight);
    showLoading();
  }

})

filter.addEventListener('input', showFilterPost);