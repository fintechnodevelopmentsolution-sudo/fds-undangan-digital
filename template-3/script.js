const audio = document.getElementById('bgm');
const toggle = document.getElementById('musicToggle');

if (audio) {
     if (toggle) {
          toggle.addEventListener('click', function () {
               if (audio.paused) {
                    audio.play();
                    toggle.textContent = '♫';
               } else {
                    audio.pause();
                    toggle.textContent = '♪';
               }
          });
     }
     audio.volume = 0.35;
}

window.addEventListener('DOMContentLoaded', function () {
     document.body.classList.add('is-ready');
     var revealTargets = document.querySelectorAll('.hero, .hero__content, .hero__photo, .card-box, .time-item, .section-title, .gallery-grid img, .rsvp-box, .intro');

     revealTargets.forEach(function (el, index) {
          el.style.animationDelay = String(index * 0.12) + 's';
          el.classList.add('reveal-in');
     });
});
