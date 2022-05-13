const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'Chirag-1',
        displayName: 'Reggae Fusion',
        artist: 'Chirag Design',
    },
    {
        name: 'Chirag-2',
        displayName: 'Seven Nation Army',
        artist: 'Chirag Design', 
    },
    {
        name: 'Chirag-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Chirag Design', 
    },
    {
        name: 'Chirag-4',
        displayName: 'Front Row',
        artist: 'Chirag Design', 
    },
]

// check if playing
let isPlaying = false;

// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

//  play or pause event listner
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update Dom 
function loadSongs(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//current song
let songIndex = 0;

// previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1 ;
    }
    loadSongs(songs[songIndex]);
    playSong();
} 

function nextSong() {
    songIndex++;
    if(songIndex > songs.length -1) {
        songIndex = 0 ;
    }
    loadSongs(songs[songIndex]);
    playSong();
} 


// on load-select song
loadSongs(songs[songIndex]);
 
//Update Progree Bar & time
function updateProgressBar(e) {
    if (isPlaying) {
        const{duration, currentTime} = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate display for duration
        const durationMinutes = Math.floor(duration/ 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime/ 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// set progressbar
function setProgressBar(e) {
    console.log( e);
   const width = this.clientWidth;
   console.log('width',  width);
   const clickX = e.offsetX;
   console.log(clickX);
   const {duration} = music;
   console.log((clickX / width) * duration);
   music.currentTime = (clickX / width) * duration;

}

// Add event listner
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);











