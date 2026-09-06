const audio = document.getElementById('bgm');
const toggle = document.getElementById('musicToggle');

if (audio) {
     if (toggle) {
          toggle.addEventListener('click', function () {
               if (audio.paused) {
                    audio.play().catch(function () { });
                    toggle.setAttribute('aria-pressed', 'true');
                    toggle.textContent = '♫';
               } else {
                    audio.pause();
                    toggle.setAttribute('aria-pressed', 'false');
                    toggle.textContent = '♪';
               }
          });
     }
     audio.volume = 0.35;
}

window.addEventListener('DOMContentLoaded', function () {
     var revealTargets = document.querySelectorAll('.hero, .hero__content, .hero__photo, .card-box, .time-item, .section-title, .rsvp-box, .intro');
     var observer = new IntersectionObserver(function (entries, revealObserver) {
          entries.forEach(function (entry) {
               if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
               }
          });
     }, { threshold: 0.12 });

     revealTargets.forEach(function (el, index) {
          el.style.animationDelay = String(index * 0.08) + 's';
          el.classList.add('reveal-in');
          observer.observe(el);
     });
});
