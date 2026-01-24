// Select player elements
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songTitle = document.querySelector(".player .song");
const songArtist = document.querySelector(".player small");
const songImg = document.querySelector(".player img");

// Array of songs (placeholder)
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

// Create audio element
let audio = new Audio();
audio.src = songs[currentSong].audio;

// Function to load song info
function loadSong(index) {
  audio.src = songs[index].audio;
  songTitle.textContent = songs[index].title;
  songArtist.textContent = songs[index].artist;
  songImg.src = songs[index].img;
}

// Play or pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";
});

// Next song
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";
});

// Click on a card to play that song
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
