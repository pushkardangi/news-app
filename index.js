const api_key = "ec3821b74292bd8e3c8e45c4a92aa7e5";
let countries = "in";
let languages = "en";
let limit = 12;
let currentPage = 1;

async function fetchNews(page) {
  try {
    document.getElementById("news").innerHTML = "<h3>Loading news . . .</h3>";    

    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let categories = Array.from(checkedBoxes)
      .map((checkbox) => checkbox.value)
      .join(",");

    if (!categories) {
      categories = "general"; // default category on load
    }

    const url = `http://api.mediastack.com/v1/news?access_key=${api_key}&countries=${countries}&languages=${languages}&limit=${limit}&categories=${categories}&offset=${(page - 1) * limit}`;

    const response = await fetch(url);
    const result = await response.json();
    const news = result.data;

    let newsCards = "";
    for (let i = 0; i < news.length; i++) {
      let imageUrl = news[i].image ? news[i].image : "news.jpg";
      newsCards += `
        <div class="card">
          <img src="${imageUrl}" alt="${news[i].title}">
          <h3>Title: ${news[i].title}</h3>
          <div>News: ${news[i].description}</div>
        </div>
      `;
    }

    document.getElementById("news").innerHTML = newsCards;
    updatePagination();

  } catch (error) {
    alert("Error: " + error.message);
    console.log(error);
  }
}

function updatePagination() {
  const pageButtons = document.querySelectorAll(".page-btn");
  
  pageButtons.forEach((btn, index) => {
    let pageNum = index + 1;
    btn.classList.toggle("active", pageNum === currentPage);
  });

  document.getElementById("prev").disabled = currentPage === 1;
  document.getElementById("next").disabled = currentPage === 6;
}

function goToPage(page) {
  currentPage = page;
  fetchNews(currentPage);
}

function changePage(direction) {
  if ((direction === -1 && currentPage > 1) || (direction === 1 && currentPage < 6)) {
    currentPage += direction;
    fetchNews(currentPage);
  }
}

// Call on button click
document.getElementById("search").addEventListener("click", fetchNews);

// Call automatically on page load
window.addEventListener("load", fetchNews);
