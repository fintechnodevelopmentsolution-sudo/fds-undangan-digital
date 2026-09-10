<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
     template: { type: Object, required: true },
});

// Fitur Custom (Guest & Music)
const urlParams = new URLSearchParams(window.location.search);
const guestName = ref(urlParams.get('to') || 'Tamu Kehormatan');
const customMusic = ref(urlParams.get('music'));

const audio = ref(null);
const isPlaying = ref(false);
const showNotice = ref(true);
const isOpening = ref(false);
const revealObserver = ref(null);
const logoUrl = `${import.meta.env.BASE_URL}logo-transparan.png`;

// Interactive Features State
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let timerInterval = null;
const copiedToast = ref(false);

const wishes = ref([
    { name: 'Keluarga Besar Budi', time: '1 hari lalu', message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.' },
    { name: 'Sarah & Partner', time: '2 hari lalu', message: 'Lancar-lancar sampai hari H yaa sayang! Bahagia selalu untuk kalian berdua.' },
    { name: 'Andi M', time: '3 hari lalu', message: 'Happy wedding brother! Wishing you a lifetime of love and happiness.' }
]);

const newWish = ref({ name: guestName.value !== 'Tamu Kehormatan' ? guestName.value : '', message: '' });

// Barcode URL
const qrCodeUrl = computed(() => {
     return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=GIFT-${encodeURIComponent(guestName.value)}`;
});

const themeStyle = computed(() => ({
     '--theme-primary': props.template.primary,
     '--theme-strong': props.template.strong,
     '--theme-bg': props.template.background,
     '--theme-bg-alt': props.template.backgroundAlt,
}));

function toggleMusic() {
     if (!audio.value) return;
     if (audio.value.paused) {
          audio.value.play().then(() => { isPlaying.value = true; }).catch(() => { isPlaying.value = false; });
     } else {
          audio.value.pause();
          isPlaying.value = false;
     }
}

function openInvitation() {
     isOpening.value = true;
     document.body.style.overflow = 'auto';
     toggleMusic();
     
     setTimeout(() => {
          showNotice.value = false;
     }, 600);
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    copiedToast.value = true;
    setTimeout(() => { copiedToast.value = false; }, 3000);
}

function submitWish() {
    if (!newWish.value.name || !newWish.value.message) return;
    wishes.value.unshift({
        name: newWish.value.name,
        time: 'Baru saja',
        message: newWish.value.message
    });
    newWish.value.message = '';
}

function updateCountdown() {
    // Hardcoded target date for demo purposes (e.g., Dec 31, 2026)
    const target = new Date("December 31, 2026 08:00:00").getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) return;

    countdown.value = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
}

onMounted(() => {
     document.body.style.overflow = 'hidden';
     
     timerInterval = setInterval(updateCountdown, 1000);
     updateCountdown();

     revealObserver.value = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
               if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
               }
          });
     }, { threshold: 0.12 });

     document.querySelectorAll('.reveal').forEach((element) => revealObserver.value.observe(element));
});

onBeforeUnmount(() => {
     revealObserver.value?.disconnect();
     clearInterval(timerInterval);
     document.body.style.overflow = 'auto';
});
</script>

<template>
     <div class="invitation" :style="themeStyle">
          <!-- Interactive Floating Particles -->
          <div class="particles">
              <div class="particle-wrapper" v-for="i in 18" :key="i" :style="{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${12 + Math.random() * 10}s` }">
                  <div class="particle" :style="{ animationDelay: `${Math.random() * 3}s`, animationDuration: `${3 + Math.random() * 3}s` }"></div>
              </div>
          </div>
     
          <audio ref="audio" :src="customMusic || template.music" loop preload="none" />
          
          <button class="music-toggle" :class="{ 'is-playing': isPlaying }" type="button" aria-label="Putar musik" @click="toggleMusic">
               <svg v-if="isPlaying" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
               <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </button>

          <!-- Toast Notification -->
          <div class="toast" :class="{ 'show': copiedToast }">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Berhasil disalin!
          </div>

          <div v-if="showNotice" class="welcome-screen" :class="{ 'is-opening': isOpening }">
               <div class="welcome-bg" :style="{ backgroundImage: `url(${template.heroImage})` }"></div>
               <div class="welcome-overlay"></div>
               <div class="welcome-screen__content">
                    <span class="eyebrow welcome-eyebrow">The Wedding of</span>
                    <h1 class="welcome-names">{{ template.firstName }} <span>&</span> {{ template.secondName }}</h1>
                    
                    <div class="guest-card">
                         <p class="guest-greeting">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
                         <h2 class="guest-name">{{ guestName }}</h2>
                    </div>
                    
                    <button class="button button--primary" type="button" @click="openInvitation">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        Buka Undangan
                    </button>
               </div>
          </div>

          <main class="invitation-shell">
               <div class="brandbar reveal">
                    <img class="brandmark" :src="logoUrl" alt="FDS" />
                    <span>Fintechno Development Solution</span>
                    <span class="brandbar__tag">{{ template.title }}</span>
               </div>

               <header class="hero reveal">
                    <div class="hero__content">
                         <span class="eyebrow">Pernikahan</span>
                         <h1>{{ template.firstName }} <em>&</em> {{ template.secondName }}</h1>
                         <p>Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i <strong>{{ guestName }}</strong> untuk hadir dalam hari bahagia kami.</p>
                         
                         <!-- Live Countdown -->
                         <div class="countdown-timer">
                             <div class="time-box"><strong>{{ countdown.days }}</strong><span>Hari</span></div>
                             <span class="colon">:</span>
                             <div class="time-box"><strong>{{ countdown.hours.toString().padStart(2, '0') }}</strong><span>Jam</span></div>
                             <span class="colon">:</span>
                             <div class="time-box"><strong>{{ countdown.minutes.toString().padStart(2, '0') }}</strong><span>Menit</span></div>
                             <span class="colon">:</span>
                             <div class="time-box"><strong>{{ countdown.seconds.toString().padStart(2, '0') }}</strong><span>Detik</span></div>
                         </div>
                         
                         <a class="button button--outline calendar-btn" href="https://calendar.google.com/" target="_blank">
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                             Simpan ke Kalender
                         </a>
                    </div>
                    <div class="hero__visual">
                         <img :src="template.heroImage" :alt="`Foto ${template.couple}`" />
                         <span class="hero__badge">{{ template.title }}</span>
                         
                         <!-- Spinning Dynamic Badge -->
                         <div class="spinning-badge">
                              <svg viewBox="0 0 100 100">
                                   <defs><path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" /></defs>
                                   <text font-size="11.5" font-weight="bold" letter-spacing="1.5" fill="currentColor">
                                        <textPath href="#circle">
                                             • WEDDING INVITATION • SAVE THE DATE 
                                        </textPath>
                                   </text>
                              </svg>
                              <div class="badge-center">{{ template.firstName.charAt(0) }}&{{ template.secondName.charAt(0) }}</div>
                         </div>
                    </div>
               </header>

               <section class="quote-panel reveal">
                    <!-- Giant Watermark Quote Icon -->
                    <svg class="quote-watermark" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.714 4.029-7.986 8.322-8.523l.661 1.942c-4.464.218-6.027 3.323-6.027 6.136h5.027v7.836h-8zm-14.017 0v-7.391c0-5.714 4.029-7.986 8.322-8.523l.661 1.942c-4.464.218-6.027 3.323-6.027 6.136h5.027v7.836h-8z"/></svg>
                    
                    <div class="quote-content">
                         <p>{{ template.quote }}</p>
                         <div class="quote-divider">
                             <svg width="150" height="20" viewBox="0 0 150 20" fill="none" stroke="currentColor" stroke-width="1"><line x1="0" y1="10" x2="60" y2="10"/><circle cx="75" cy="10" r="4"/><line x1="90" y1="10" x2="150" y2="10"/></svg>
                         </div>
                         <span class="quote-author">&mdash; {{ template.firstName }} & {{ template.secondName }} &mdash;</span>
                    </div>
               </section>

               <section class="details reveal">
                    <article>
                        <div class="detail-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="M12 10.5l-1-2 1-1.5 1 1.5-1 2z"/></svg>
                        </div>
                        <span class="label">Akad Nikah</span>
                        <strong>08.00 WIB</strong>
                        <p>{{ template.venue }}</p>
                        <a href="https://maps.google.com" target="_blank" class="maps-link">Buka Peta Lokasi &rarr;</a>
                    </article>
                    <article>
                        <div class="detail-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 22h8"/><path d="M12 15v7"/><path d="M8 3h8l-1.5 6a2.5 2.5 0 0 1-5 0L8 3z"/></svg>
                        </div>
                        <span class="label">Resepsi</span>
                        <strong>11.00 WIB</strong>
                        <p>{{ template.date }}</p>
                        <a href="https://maps.google.com" target="_blank" class="maps-link">Buka Peta Lokasi &rarr;</a>
                    </article>
                    <article>
                        <div class="detail-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5.5l-7 4v9h14v-9l-7-4z"/><path d="M12 2v3.5"/><path d="M9.5 2h5"/></svg>
                        </div>
                        <span class="label">Dress Code</span>
                        <strong>Elegant</strong>
                        <p>Formal dan nyaman</p>
                    </article>
               </section>

               <section class="section reveal">
                    <div class="section-heading"><span class="eyebrow">Agenda</span><h2>Susunan Acara</h2></div>
                    <div class="timeline">
                         <article v-for="item in template.agenda" :key="item.time" class="timeline__item">
                              <span>{{ item.time }}</span><div><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div>
                         </article>
                    </div>
               </section>

               <section class="section reveal">
                    <div class="section-heading"><span class="eyebrow">Gallery</span><h2>Kenangan Kami</h2></div>
                    <div class="gallery">
                         <img v-for="(image, index) in template.gallery" :key="image" :src="image" :alt="`Momen ${index + 1} ${template.couple}`" />
                    </div>
               </section>
               
               <!-- Digital Envelope / Angpao -->
               <section class="section reveal angpao-section">
                    <div class="section-heading"><span class="eyebrow">Digital Envelope</span><h2>Kirim Hadiah</h2></div>
                    <p class="angpao-desc">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, jika Anda ingin memberikan tanda kasih untuk kami, dapat melalui dompet digital berikut:</p>
                    <div class="angpao-grid">
                        <!-- Rekening 1 -->
                        <div class="angpao-card">
                            <h3 class="bank-name">BCA</h3>
                            <div class="acc-number">1234 5678 90</div>
                            <p class="acc-name">a.n. {{ template.firstName }}</p>
                            <button class="button button--small button--outline" @click="copyText('1234567890')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                Salin No. Rekening
                            </button>
                        </div>
                        <!-- Rekening 2 -->
                        <div class="angpao-card">
                            <h3 class="bank-name">Mandiri</h3>
                            <div class="acc-number">0987 6543 21</div>
                            <p class="acc-name">a.n. {{ template.secondName }}</p>
                            <button class="button button--small button--outline" @click="copyText('0987654321')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                Salin No. Rekening
                            </button>
                        </div>
                    </div>
               </section>

               <!-- QR Code Ticket -->
               <section class="section reveal qr-section">
                    <div class="ticket-wrapper">
                         <div class="ticket-left">
                              <span class="eyebrow">Special Gift</span>
                              <h2>Klaim Souvenir</h2>
                              <p class="qr-desc">Tunjukkan Tiket QR ini pada penerima tamu untuk menukarkan souvenir spesial yang telah kami siapkan khusus untuk Anda.</p>
                              <div class="ticket-guest">
                                  <span>GUEST:</span>
                                  <h3>{{ guestName }}</h3>
                              </div>
                         </div>
                         <div class="ticket-right">
                              <div class="qr-frame">
                                   <img :src="qrCodeUrl" alt="QR Code Tamu" />
                              </div>
                              <p>SCAN DISINI</p>
                         </div>
                    </div>
               </section>

               <!-- Guestbook / Wishes -->
               <section class="section reveal guestbook">
                    <div class="section-heading"><span class="eyebrow">Guestbook</span><h2>Kirim Ucapan</h2></div>
                    <div class="guestbook-container">
                        <div class="guestbook-form">
                            <input type="text" v-model="newWish.name" placeholder="Nama Anda" class="form-input" />
                            <textarea v-model="newWish.message" placeholder="Tuliskan ucapan dan doa restu..." class="form-input form-textarea" rows="4"></textarea>
                            <button class="button button--primary" @click="submitWish" style="width: 100%">Kirim Ucapan</button>
                        </div>
                        <div class="wishes-feed">
                            <div v-for="(wish, i) in wishes" :key="i" class="wish-item">
                                <div class="wish-avatar">{{ wish.name.charAt(0) }}</div>
                                <div class="wish-content">
                                    <div class="wish-header">
                                        <strong>{{ wish.name }}</strong>
                                        <span class="wish-time">{{ wish.time }}</span>
                                    </div>
                                    <p>{{ wish.message }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
               </section>

               <section class="rsvp reveal">
                    <span class="eyebrow">Konfirmasi</span>
                    <h2>Kehadiran Anda</h2>
                    <p>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
                    <a class="button button--primary" href="https://wa.me/6281234567890" target="_blank" rel="noopener">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 
                        RSVP via WhatsApp
                    </a>
               </section>
          </main>
     </div>
</template>

<style scoped>
/* Guest Card Styling */
.guest-card {
     margin: 25px auto; padding: 20px;
     border-top: 1px solid rgba(0,0,0,0.1); border-bottom: 1px solid rgba(0,0,0,0.1);
     max-width: 400px;
}
.guest-greeting { font-size: 0.95rem; margin-bottom: 8px; font-style: italic; opacity: 0.8; }
.guest-name { font-size: 2rem; margin: 0; color: var(--theme-strong); font-family: 'Playfair Display', serif; }

/* Countdown */
.countdown-timer {
    display: flex; justify-content: center; align-items: center; gap: 15px; margin: 30px 0;
}
.time-box {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.7); border: 1px solid rgba(0,0,0,0.05);
    border-radius: 12px; width: 65px; height: 75px; box-shadow: 0 5px 15px rgba(0,0,0,0.03);
}
.time-box strong { font-size: 1.8rem; color: var(--theme-strong); font-family: 'Playfair Display', serif; line-height: 1; }
.time-box span { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-top: 5px; font-weight: 700;}
.colon { font-size: 1.5rem; color: var(--theme-primary); font-weight: bold; margin-top: -15px; }

.calendar-btn { margin-bottom: 20px; }

/* Maps Link */
.maps-link {
    display: inline-block; margin-top: 15px; color: var(--theme-strong); font-size: 0.85rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-bottom: 1px solid;
    transition: opacity 0.3s;
}
.maps-link:hover { opacity: 0.6; }

/* Angpao / Envelope */
.angpao-desc { text-align: center; max-width: 600px; margin: 0 auto 40px; color: #666; line-height: 1.7; }
.angpao-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 700px; margin: 0 auto; }
.angpao-card {
    background: rgba(255,255,255,0.7); border: 1px solid rgba(0,0,0,0.05); border-radius: 20px;
    padding: 30px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}
.bank-name { font-family: 'DM Sans', sans-serif; font-size: 1.2rem; font-weight: 800; color: var(--ink); margin: 0 0 15px; text-transform: uppercase; letter-spacing: 1px; }
.acc-number { font-size: 1.8rem; font-family: 'Playfair Display', serif; color: var(--theme-strong); margin-bottom: 5px; }
.acc-name { color: #666; margin-bottom: 25px; }

/* Toast */
.toast {
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
    background: #333; color: white; padding: 12px 24px; border-radius: 50px; z-index: 10000;
    display: flex; align-items: center; gap: 10px; font-weight: 600; opacity: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

/* Guestbook */
.guestbook-container { display: grid; grid-template-columns: 1fr; gap: 30px; max-width: 800px; margin: 0 auto; }
@media (min-width: 768px) { .guestbook-container { grid-template-columns: 1fr 1.2fr; } }
.guestbook-form { background: rgba(255,255,255,0.7); padding: 30px; border-radius: 20px; border: 1px solid rgba(0,0,0,0.05); }
.form-input { width: 100%; padding: 15px; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; margin-bottom: 15px; font-family: inherit; font-size: 0.95rem; background: rgba(255,255,255,0.8); }
.form-input:focus { outline: 2px solid var(--theme-primary); border-color: transparent; }
.form-textarea { resize: vertical; }

.wishes-feed { background: rgba(255,255,255,0.5); border-radius: 20px; padding: 20px; max-height: 400px; overflow-y: auto; border: 1px solid rgba(0,0,0,0.05); }
.wish-item { display: flex; gap: 15px; padding: 15px; background: white; border-radius: 16px; margin-bottom: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.02); }
.wish-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--theme-primary); color: white; display: flex; justify-content: center; align-items: center; font-weight: 700; font-size: 1.2rem; font-family: 'Playfair Display', serif; flex-shrink: 0; }
.wish-content { flex: 1; text-align: left; }
.wish-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
.wish-header strong { color: var(--ink); font-size: 0.95rem; }
.wish-time { font-size: 0.75rem; color: #999; }
.wish-content p { margin: 0; color: #666; font-size: 0.9rem; line-height: 1.5; }

/* Particles */
.particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.particle { position: absolute; width: 6px; height: 6px; background: var(--theme-primary); border-radius: 50%; opacity: 0; top: -10px; animation: float-down linear infinite; filter: blur(1px); }
@keyframes float-down {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

/* Base UI Adjustments */
.qr-section { margin-top: 80px; }
.ticket-wrapper {
     display: flex; flex-direction: column; background: rgba(255,255,255,0.7);
     border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.05);
     overflow: hidden; max-width: 750px; margin: 0 auto; backdrop-filter: blur(10px);
}
@media (min-width: 650px) { .ticket-wrapper { flex-direction: row; } }
.ticket-left { padding: 40px; flex: 1; border-bottom: 2px dashed rgba(0,0,0,0.1); text-align: left; }
@media (min-width: 650px) { .ticket-left { border-bottom: none; border-right: 2px dashed rgba(0,0,0,0.1); } }
.ticket-left h2 { font-size: 2.2rem; margin: 10px 0 15px; }
.qr-desc { color: #666; line-height: 1.6; margin-bottom: 25px; }
.ticket-guest span { background: var(--theme-strong); color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; }
.ticket-guest h3 { font-size: 2rem; margin: 10px 0 0; color: var(--ink); font-family: 'Playfair Display', serif; }

.ticket-right {
     padding: 30px; background: color-mix(in srgb, var(--theme-bg-alt) 80%, white);
     display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.qr-frame { background: white; padding: 12px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); margin-bottom: 12px; }
.qr-frame img { width: 150px; height: 150px; display: block; }
.ticket-right p { font-weight: 700; letter-spacing: 2px; color: var(--theme-strong); margin: 0; font-size: 0.9rem; }

.detail-icon { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: color-mix(in srgb, var(--theme-primary) 15%, transparent); border-radius: 50%; color: var(--theme-strong); margin-bottom: 16px; }
.quote-icon { color: var(--theme-primary); opacity: 0.3; margin: -10px auto 10px; display: block; }
.music-toggle { display: flex; align-items: center; justify-content: center; padding: 0; }
.music-toggle.is-playing svg { animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.8; } }
</style>
