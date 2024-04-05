let lists = [
  { ayahnum: 6, souranum: 1, name: "الفاتحة" },
  { ayahnum: 127, souranum: 2, name: "البقرة" },
  { ayahnum: 201, souranum: 2, name: "البقرة" },
  { ayahnum: 250, souranum: 2, name: "البقرة" },
  { ayahnum: 286, souranum: 2, name: "البقرة" },
  { ayahnum: 286, souranum: 2, name: "البقرة" },
  { ayahnum: 286, souranum: 2, name: "البقرة" },
  { ayahnum: 8, souranum: 3, name: "آل عمران" },
  { ayahnum: 16, souranum: 3, name: "آل عمران" },
  { ayahnum: 38, souranum: 3, name: "آل عمران" },
  { ayahnum: 53, souranum: 3, name: "آل عمران" },
  { ayahnum: 147, souranum: 3, name: "آل عمران" },
  { ayahnum: 173, souranum: 3, name: "آل عمران" },
  { ayahnum: 191, souranum: 3, name: "آل عمران" },
  { ayahnum: 193, souranum: 3, name: "آل عمران" },
  { ayahnum: 194, souranum: 3, name: "آل عمران" },
  { ayahnum: 75, souranum: 4, name: "النساء" },
  { ayahnum: 114, souranum: 5, name: "المائدة" },
  { ayahnum: 23, souranum: 7, name: "الأعراف" },
  { ayahnum: 89, souranum: 7, name: "الأعراف" },
  { ayahnum: 126, souranum: 7, name: "الأعراف" },
  { ayahnum: 150, souranum: 7, name: "الأعراف" },
  { ayahnum: 151, souranum: 7, name: "الأعراف" },
  { ayahnum: 155, souranum: 7, name: "الأعراف" },
  { ayahnum: 85, souranum: 10, name: "يونس" },
  { ayahnum: 101, souranum: 12, name: "يوسف" },
  { ayahnum: 40, souranum: 14, name: "إبراهيم" },
  { ayahnum: 41, souranum: 14, name: "إبراهيم" },
  { ayahnum: 24, souranum: 17, name: "الإسراء" },
  { ayahnum: 80, souranum: 17, name: "الإسراء" },
  { ayahnum: 10, souranum: 18, name: "الكهف" },
  { ayahnum: 25, souranum: 20, name: "طه" },
  { ayahnum: 114, souranum: 20, name: "طه" },
  { ayahnum: 87, souranum: 21, name: "الأنبياء" },
  { ayahnum: 89, souranum: 21, name: "الأنبياء" },
  { ayahnum: 29, souranum: 23, name: "المؤمنون" },
  { ayahnum: 97, souranum: 23, name: "المؤمنون" },
  { ayahnum: 109, souranum: 23, name: "المؤمنون" },
  { ayahnum: 118, souranum: 23, name: "المؤمنون" },
  { ayahnum: 65, souranum: 25, name: "الفرقان" },
  { ayahnum: 74, souranum: 25, name: "الفرقان" },
  { ayahnum: 84, souranum: 26, name: "الشعراء" },
  { ayahnum: 87, souranum: 26, name: "الشعراء" },
  { ayahnum: 16, souranum: 28, name: "القصص" },
  { ayahnum: 21, souranum: 28, name: "القصص" },
  { ayahnum: 24, souranum: 28, name: "القصص" },
  { ayahnum: 30, souranum: 29, name: "العنكبوت" },
  { ayahnum: 100, souranum: 37, name: "الصافات" },
  { ayahnum: 7, souranum: 40, name: "غافر" },
  { ayahnum: 8, souranum: 40, name: "غافر" },
  { ayahnum: 12, souranum: 44, name: "الدخان" },
  { ayahnum: 15, souranum: 46, name: "الأحقاف" },
  { ayahnum: 10, souranum: 59, name: "الحشر" },
  { ayahnum: 4, souranum: 60, name: "الممتحنة" },
  { ayahnum: 5, souranum: 60, name: "الممتحنة" },
  { ayahnum: 8, souranum: 66, name: "التحريم" },
  { ayahnum: 11, souranum: 66, name: "التحريم" },
  { ayahnum: 28, souranum: 71, name: "نوح" }
];

const souraNameSpan = document.querySelector(".soura_name");
const ayahNumSpan = document.querySelector(".ayah_num");
const content = document.querySelector(".content");
const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");
const darkModeBtn = document.querySelector(".dark-mode-btn");

let index = 0;
let ayahs = []; // Store fetched ayahs
let ayahSrc = []; // Store fetched audio sources

// Fetch all Quranic verses in advance
const fetchAllAyahs = async () => {
  for (let i = 0; i < lists.length; i++) {
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${lists[i].souranum}:${lists[i].ayahnum}/ar.alafasy`
    );
    const data = await response.json();
    ayahs.push(data.data.text);
    ayahSrc.push(data.data.audio); // Add audio source to the array
  }
};

// Display current ayah
const displayAyah = () => {
  content.textContent = ayahs[index];
  souraNameSpan.textContent = `سوره ${lists[index].name}`;
  ayahNumSpan.textContent = `ايه (${lists[index].ayahnum})`;
  audio.src = ayahSrc[index]; // Set audio source
};
// Move to the previous ayah
const leftMove = () => {
  audioBtn.classList.remove("fa-pause");
  audioBtn.classList.add("fa-play");
  isPlaying = false;
  if (index > 0) {
    index--;
    rightBtn.style.opacity = 1;
  } else {
    leftBtn.style.opacity = 0.5;
  }
  displayAyah();
};

// Move to the next ayah
const rightMove = () => {
  audioBtn.classList.remove("fa-pause");
  audioBtn.classList.add("fa-play");
  isPlaying = false;

  if (index < lists.length - 1) {
    index++;
    leftBtn.style.opacity = 1;
  } else {
    rightBtn.style.opacity = 0.5;
  }
  displayAyah();
};

// Toggle dark mode
const toggleDarkMode = () => {
  if (localStorage["mode"] === "light") {
    document.body.classList.add("dark");
    localStorage["mode"] = "dark";
  } else {
    document.body.classList.remove("dark");
    localStorage["mode"] = "light";
  }
};

// Event listeners
leftBtn.addEventListener("click", leftMove);
rightBtn.addEventListener("click", rightMove);
darkModeBtn.addEventListener("click", toggleDarkMode);

// Initial load
window.addEventListener("load", async () => {
  if (localStorage["mode"] === "dark") {
    document.body.classList.add("dark");
  }
  await fetchAllAyahs();
  displayAyah();
});

// play and pause audio
var audio = document.getElementById("myAudio");
var isPlaying = false;
var audioBtn = document.getElementById("audioBtn");

// Event listener for playing and pausing audio
audioBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    audioBtn.classList.remove("fa-pause");
    audioBtn.classList.add("fa-play");
  } else {
    audio.play();
    isPlaying = true;
    audioBtn.classList.remove("fa-play");
    audioBtn.classList.add("fa-pause");
  }
});

// Event listener for resetting the play button when audio ends
audio.onended = function () {
  isPlaying = false;
  audioBtn.classList.remove("fa-pause");
  audioBtn.classList.add("fa-play");
};
