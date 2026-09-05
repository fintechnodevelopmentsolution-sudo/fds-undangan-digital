const audio = document.getElementById('bgm');
const toggle = document.getElementById('musicToggle');
if (audio && toggle) {
     toggle.addEventListener('click', () => {
          if (audio.paused) { audio.play(); toggle.textContent = '♫'; } else { audio.pause(); toggle.textContent = '♪'; }
     });
     audio.volume = 0.28;
}
