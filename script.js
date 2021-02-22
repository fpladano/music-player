// Importamos todos los elementos con los que queremos interactuar
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
//Hacemos un Array de objetos, para la info de cada una de las canciones
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metrix/Jacinto Design',
    }
];

// Check if Playing 
//Creamos esta variable para llevar control si la cancion esta en play o en pausa
let isPlaying = false;

// Play
function playSong() {
    //cambiamos el estado de la cancion a play es true
    isPlaying = true;
    //cambiamos el icono del boton de play por el de boton de pause, cambiando la clase del elemento
    playBtn.classList.replace('fa-play', 'fa-pause');
    //cambiamos el titulo del elemento para que salga le boton de pausa
    playBtn.setAttribute('title', 'Pause');
    //para que la musica comienze 
    music.play();
}

// Pause
function pauseSong() {
    //cambiamos el estado de la cancion a pausa es tru
    isPlaying = false;
    //cambiamos el  icone del boton de pausa por el del boton de play, cambiando la clase del elemento
    playBtn.classList.replace('fa-pause', 'fa-play');
    //cambiamos el titulo del elemento para que salga el boton de play
    playBtn.setAttribute('title', 'Play');
    //para que la musica pare
    music.pause();
}

// Play or Pause Event Listener
//un event listener en click para el btn de play o pause
//Usamos el operador tenario para ver si la musica esta sonando, si es verdad regresamos la funcion de pausa
//si es falso regresamos la funcion de play
playBtn.addEventListener('click' , () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
//En esta function pasamos como parametro un elemento del Array songs[] que seria un objeto{}
//y actualizamos los elementos HTML dependiendo de los atributos del obj Song{}
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previus Song
//Funcion para retroceder la cancion
function prevSong() {
    //modificamos el valor de la variable songIndex para que su valor sea - 1, asi retrocedemos una cancion
    songIndex--;
    // especificamos que no queremos que el valor de songIndex baje de 0, ya que lo usamos para movernos en el array
    if (songIndex < 0) {
        //si el valor de songIndex llega a bajar de 0, lo cambiamos a el length maximo del array - 1
        songIndex = songs.length - 1;
    }
    console.log(songIndex);
    //pasamos el parametro de la cancion actual usando el array y el contador, a la funcion que nos actualiza el DOM
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
//Lo mismo de arriba pero tan solo incrementamos la variable songIndex
function nextSong() {
    songIndex++;
    //Si songIndex llega al maximo valor del arreglo, la reiniciamos a 0
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// On Load
loadSong(songs[songIndex]);

// Update progress bar
function updateProgressBar(e){
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;

        // Update progress bar width 
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if ( durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`; 
        }

        // Delay switching the duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if ( currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`; 
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width ) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);