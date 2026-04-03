// Initialize Supabase Client
const SUPABASE_URL = 'https://supabase.com/dashboard/project/pvwsdbgaixmoxvigcjvr'; // e.g. https://xyz.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_vco4Jo8bMmf1ZO6lNfkNYw_m9bEu2ra';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songTitle = document.querySelector(".player .song");
const songArtist = document.querySelector(".player small");
const songImg = document.querySelector(".player img");

let songs = [];
let currentSong = 0;
let audio = new Audio();

// Fetch songs from Supabase
async function fetchSongs() {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching songs:', error);
    return;
  }

  songs = data;
  
  // Set the initial song once data is loaded
  if (songs.length > 0) {
    audio.src = songs[currentSong].audio;
    loadSong(currentSong);
  }
}

// load song info
function loadSong(index) {
  if (!songs[index]) return;
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

// Call the fetch function to run on start
fetchSongs();
