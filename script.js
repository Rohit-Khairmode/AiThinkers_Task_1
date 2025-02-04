const articles = [
  {
    image: "./img/news.jpg",
    date: "January 15, 2022",
    title: "Launch a Creative Business",
  },
  {
    image: "./img/social-media.jpg",
    date: "January 15, 2022",
    title: "Why Your Startup Needs an Active Social Media Presence",
  },
  {
    image: "./img/business-performance.jpg",
    date: "January 15, 2022",
    title: "How Brand Activism Can Influence Business Performance",
  },
  {
    image: "./img/business-growth.jpg",
    date: "February 10, 2022",
    title: "Top Strategies for Building an Online Business",
  },
  {
    image: "./img/productivity.jpg",
    date: "March 5, 2022",
    title: "Boost Your Productivity with Minimalism",
  },
];

const container = document.querySelector(".articles-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;
let itemsPerPage = 0;
if (window.innerWidth < 540) {
  itemsPerPage = 1;
} else if (window.innerWidth >= 540 && window.innerWidth < 840) {
  itemsPerPage = 2;
} else {
  itemsPerPage = 3;
}

function renderArticles() {
  container.innerHTML = "";

  const startIndex = currentIndex;
  const endIndex = Math.min(startIndex + itemsPerPage, articles.length);

  for (let i = startIndex; i < endIndex; i++) {
    const article = articles[i];
    const articleCard = document.createElement("div");
    articleCard.classList.add("article-card");

    articleCard.innerHTML = `
        <div class="article-image" style="background-image: url('${article.image}');"></div>
        <div class="article-content">
          <p class="article-date">${article.date}</p>
          <h3 class="article-title">${article.title}</h3>
        </div>
      `;

    container.appendChild(articleCard);
  }
}

prevBtn.addEventListener("click", () => {
  let temp = Math.max(0, currentIndex - itemsPerPage);
  if (temp == currentIndex) return;
  currentIndex = temp;
  renderArticles();
});

nextBtn.addEventListener("click", () => {
  let temp = Math.min(
    currentIndex + itemsPerPage,
    articles.length - itemsPerPage
  );
  if (temp == currentIndex) return;
  currentIndex = temp;
  renderArticles();
});

renderArticles();
window.addEventListener("resize", () => {
  if (window.innerWidth < 540) {
    itemsPerPage = 1;
  } else if (window.innerWidth >= 540 && window.innerWidth < 840) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 3;
  }
  renderArticles();
});

////////////////////////////////////////////

const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-96px",
  }
);
obs.observe(sectionHeroEl);

////////////////////////////////////////////
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

////////////////////////////////////////////
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    if (href !== "#" && href.startsWith("#")) {
      const selectionEl = document.querySelector(href);
      selectionEl.scrollIntoView({ behavior: "smooth" });
    }
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});
