<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
     template: { type: Object, required: true },
});

const audio = ref(null);
const isPlaying = ref(false);
const showNotice = ref(true);
const revealObserver = ref(null);
const logoUrl = `${import.meta.env.BASE_URL}logo-transparan.png`;

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
     showNotice.value = false;
     toggleMusic();
}

onMounted(() => {
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

onBeforeUnmount(() => revealObserver.value?.disconnect());
</script>

<template>
     <div class="invitation" :style="themeStyle">
          <audio ref="audio" :src="template.music" loop preload="none" />
          <button class="music-toggle" type="button" aria-label="Putar atau jeda musik" :aria-pressed="isPlaying" @click="toggleMusic">
               {{ isPlaying ? '♫' : '♪' }}
          </button>

          <div v-if="showNotice" class="welcome-screen">
               <div class="welcome-screen__content">
                    <span class="eyebrow">The Wedding of</span>
                    <h1>{{ template.couple }}</h1>
                    <p>Fintechno Development Solution untuk hari yang penuh makna.</p>
                    <button class="button button--primary" type="button" @click="openInvitation">Buka Undangan</button>
               </div>
          </div>

          <main class="invitation-shell">
               <div class="brandbar">
                    <img class="brandmark" :src="logoUrl" alt="FDS" />
                    <span>Fintechno Development Solution</span>
                    <span class="brandbar__tag">Fintechno Development Solution</span>
               </div>

               <header class="hero reveal">
                    <div class="hero__content">
                         <span class="eyebrow">The Wedding of</span>
                         <h1>{{ template.firstName }} <em>&</em> {{ template.secondName }}</h1>
                         <p>{{ template.description }}</p>
                         <span class="date-pill">{{ template.date }}</span>
                    </div>
                    <div class="hero__visual">
                         <img :src="template.heroImage" :alt="`Foto ${template.couple}`" />
                         <span class="hero__badge">{{ template.title }}</span>
                    </div>
               </header>

               <section class="quote-panel reveal">
                    <p>{{ template.quote }}</p>
               </section>

               <section class="details reveal">
                    <article><span class="label">Akad Nikah</span><strong>08.00 WIB</strong><p>{{ template.venue }}</p></article>
                    <article><span class="label">Resepsi</span><strong>11.00 WIB</strong><p>{{ template.date }}</p></article>
                    <article><span class="label">Dress Code</span><strong>Elegant</strong><p>Formal dan nyaman</p></article>
               </section>

               <section class="section reveal">
                    <div class="section-heading"><span class="eyebrow">Agenda</span><h2>Acara Kami</h2></div>
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

               <section class="rsvp reveal">
                    <span class="eyebrow">Konfirmasi</span>
                    <h2>Kami Menantikan Kehadiran Anda</h2>
                    <p>Mohon konfirmasi kehadiran sebelum hari bahagia kami.</p>
                    <a class="button button--primary" href="https://wa.me/6281234567890" target="_blank" rel="noopener">RSVP WhatsApp</a>
               </section>
          </main>
     </div>
</template>
