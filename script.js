
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songTitle = document.querySelector(".player .song");
const songArtist = document.querySelector(".player small");
const songImg = document.querySelector(".player img");

const songs = [
  {
    title: "Sahiba",
    artist: "Aditya Rikhari",
    img: "https://picsum.photos/100?1",
    audio: "audio/song1.mp3"
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    img: "https://picsum.photos/100?2",
    audio: "audio/song2.mp3"
  },
  {
    title: "Brooklyn Baby",
    artist: "Lana Del Rey",
    img: "https://picsum.photos/100?3",
    audio: "audio/song3.mp3"
  },
  {
    title: "arz kiya",
    artist: "Anuv Jain",
    img: "https://picsum.photos/100?4",
    audio: "audio/song4.mp3"
  }
];

let currentSong = 0;

// audio element
let audio = new Audio();
audio.src = songs[currentSong].audio;

// load song info
function loadSong(index) {
  audio.src = songs[index].audio;
  songTitle.textContent = songs[index].title;
  songArtist.textContent = songs[index].artist;
  songImg.src = songs[index].img;
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";
});

const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (songs[index]) { // check if song exists
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      playBtn.textContent = "⏸";
    }
  });
});
