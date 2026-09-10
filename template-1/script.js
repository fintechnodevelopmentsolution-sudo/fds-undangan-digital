document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || 'Tamu Kehormatan';
    const customMusic = urlParams.get('music');

    const elementsToUpdate = ['coverGuestName', 'eventGuestName', 'qrCodeText'];
    elementsToUpdate.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = guestName;
    });

    const elQrImage = document.getElementById('qrCodeImage');
    if (elQrImage) {
        const qrData = 'GIFT-CLAIM-' + encodeURIComponent(guestName);
        elQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;
    }

    const audio = document.getElementById('bgm');
    const audioSource = document.getElementById('bgmSource');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    if (customMusic && audioSource && audio) {
        audioSource.src = customMusic;
        audio.load();
    }
    if (audio) {
        audio.volume = 0.4;
    }

    const openBtn = document.getElementById('openInviteBtn');
    const cover = document.getElementById('coverOverlay');
    const mainContent = document.getElementById('mainContent');

    document.body.classList.add('no-scroll');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            cover.classList.add('hide');
            document.body.classList.remove('no-scroll');
            mainContent.style.display = 'block';
            
            if (audio) {
                audio.play().then(() => {
                    isPlaying = true;
                    if (musicToggle) musicToggle.style.display = 'flex';
                }).catch(err => console.log("Autoplay blocked", err));
            } else if (musicToggle) {
                musicToggle.style.display = 'flex';
            }

            setTimeout(() => {
                initScrollAnimations();
                window.scrollTo(0,0);
            }, 100);
        });
    }

    if (musicToggle && audio) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                musicToggle.classList.add('paused');
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                audio.play();
                musicToggle.classList.remove('paused');
                musicToggle.innerHTML = '<i class="fas fa-compact-disc"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    const countdownDate = new Date("Nov 22, 2026 08:00:00").getTime();
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const cdDays = document.getElementById("cd-days");
        if (cdDays) {
            cdDays.innerHTML = days < 10 ? '0' + days : days;
            document.getElementById("cd-hours").innerHTML = hours < 10 ? '0' + hours : hours;
            document.getElementById("cd-minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById("cd-seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;
        }

        if (distance < 0) {
            clearInterval(x);
            if(cdDays) {
                document.getElementById("countdown").innerHTML = "<div class='time-box'><span>Acara Telah Dimulai</span></div>";
            }
        }
    }, 1000);

    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
        
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
});
