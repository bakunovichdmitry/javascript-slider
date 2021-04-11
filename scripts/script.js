const slides = document.querySelectorAll('.slider-wrapper .slide');

// Create buttons
let buttonList = document.getElementsByClassName('btn-list')[0];
for (let i = 0; i < slides.length; i++) {
    let div = document.createElement('div');
    div.className = "btn";
    buttonList.append(div);
}

const buttons = Array.prototype.slice.call(document.querySelectorAll('.btn-list .btn'));
for (const button of buttons) {
    button.onclick = function () {
        setSlide(buttons.indexOf(button));
    }
}

// Create slider
function nextSlide(){
    setSlide(currentSlide + 1);
}

function previousSlide(){
    setSlide(currentSlide - 1);
}

let currentSlide = 0;
function setSlide(n){
    slides[currentSlide].className = 'slide';
    buttons[currentSlide].className = 'btn';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'slide showing';
    buttons[currentSlide].className = 'btn btn-active';

    localStorage.setItem('slide', currentSlide);
}

const next = document.getElementById('next');
const previous = document.getElementById('prev');

next.onclick = function(){
    nextSlide();
};

previous.onclick = function(){
    previousSlide();
};

const pauseButton = document.getElementById('stop');
let slideInterval;

function pauseSlideshow(){
    pauseButton.innerHTML = '&#9658;';
    localStorage.setItem('playing', '0');
    playing = false;
    clearInterval(slideInterval);
}

function playSlideshow(){
    pauseButton.innerHTML = '&#10074;&#10074;';
    localStorage.setItem('playing', '1');
    playing = true;
    slideInterval = setInterval(nextSlide,2000);
}

let playing;
pauseButton.onclick = function () {
    if (playing) {
        pauseSlideshow();
    } else {
        playSlideshow();
    }
}

if (localStorage.getItem('playing') === '1') {
    playSlideshow()
} else {
    pauseSlideshow()
}

// Add work with keyboard
document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') {
        window.close()
    } else if (event.code === 'ArrowLeft') {
        pauseSlideshow();
        previousSlide()
    } else if (event.code === 'ArrowRight') {
        pauseSlideshow();
        nextSlide()
    }
});


setSlide(Number(localStorage.getItem('slide')));