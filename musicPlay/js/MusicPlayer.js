var currentSong = 0,
  maxSong, currentTime, totalTime, playing = false,
  position = 0,
  maxPosition = 200,
  pause = false,
  isEnter = false;

const elements = {
  images: document.getElementsByClassName("album-art"),
  songs: document.getElementsByClassName("song"),
  artists: document.getElementsByClassName("artist"),
  music: document.querySelectorAll(".device__audio audio"),
  play: document.getElementById("play-button"),
  previous: document.getElementById("previous-button"),
  next: document.getElementById("next-button"),
  currentSong: document.getElementById("current-song"),
  slider: document.getElementById("slider"),
  currentTime: document.querySelector(".current-time"),
  totalTime: document.querySelector(".total-time")
}

elements.slider.value = 0;

function next() {
  updateDOM('remove');
  elements.music[currentSong].pause();
  currentSong++;
  if(currentSong > maxSong) {
    currentSong = 0;
  }
  updateDOM('add');
  position = 0;
  elements.slider.value = 0;
  elements.music[currentSong].currentTime = 0;
  playing = false;
  play();
}

function previous() {
  updateDOM('remove');
  elements.music[currentSong].pause();
  currentSong--;
  if(currentSong < 0) {
    currentSong = maxSong;
  }
  updateDOM('add');
  position = 0;
  elements.slider.value = 0;
  elements.music[currentSong].currentTime = 0;
  playing = false;
  play();
}

function updateDOM(action) {
  elements.currentSong.innerHTML = currentSong + 1;
  if(action === 'add') {
    elements.images[currentSong].classList.add("active");
    elements.songs[currentSong].classList.add("active");
    elements.artists[currentSong].classList.add("active");
  } else {
    elements.images[currentSong].classList.remove("active");
    elements.songs[currentSong].classList.remove("active");
    elements.artists[currentSong].classList.remove("active");
  }
}

function play() {
  if(!playing) {
    pause = false;
    elements.play.classList.add("pause");
    elements.music[currentSong].play();
  } else {
    pause = true;
    elements.play.classList.remove("pause");
    elements.music[currentSong].pause();
  }
  playBar();
  playing = !playing;
  getTotalTime();
}

function playBar() {
  if(!pause) {
    elements.music[currentSong].ontimeupdate = function() {
      currentTime = elements.music[currentSong].currentTime;
      position = maxPosition * currentTime / totalTime;
      elements.slider.value = position;
      if(position == maxPosition) {
        playing = true;
        play();
        if(!isEnter) {
        next();
        }
      }
      elements.slider.style.background = `linear-gradient(to right,#059CFA ${position}px,rgba(78, 134, 165, 0.03) 0)`;
      elements.currentTime.innerHTML = formatTime(currentTime);
    }
  }
}

function sliderChange() {
  position = elements.slider.value;
  elements.music[currentSong].currentTime = totalTime * position / maxPosition;
}

function getTotalTime() {
  totalTime = elements.music[currentSong].duration;
  elements.totalTime.innerHTML = formatTime(totalTime);
}

function formatTime(seconds) {
  var h, m, s;
  h = Math.floor(seconds / 3600);
  m = Math.floor((seconds % 3600) / 60);
  s = Math.floor(seconds % 60);
  h = h >= 10 ? h : "0" + h;
  m = m >= 10 ? m : "0" + m;
  s = s >= 10 ? s : "0" + s;
  var timeStr = h + ":" + m + ":" + s;
  return timeStr;
}

function init() {
  playBar();
  elements.images[currentSong].classList.toggle("active");
  elements.songs[currentSong].classList.toggle("active");
  elements.artists[currentSong].classList.toggle("active");
  maxSong = elements.images.length - 1;
  elements.play.addEventListener("click", function() {
    play();
  });
  elements.previous.addEventListener("click", function() {
    previous();
  });
  elements.next.addEventListener("click", function() {
    next();
  });
  elements.slider.addEventListener('mouseenter', function() {
    isEnter = true;
  });
  elements.slider.addEventListener('mouseleave', function() {
    if(isEnter) {
      if(position == maxPosition) {
        next();
      }
    }
    isEnter = false;
  });
  elements.slider.oninput = sliderChange;
  elements.music[0].oncanplay = getTotalTime;
}

init();