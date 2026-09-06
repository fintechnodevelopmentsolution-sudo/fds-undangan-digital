<script setup>
import { computed, ref } from 'vue';
import InvitationView from './components/InvitationView.vue';
import { getTemplate, templates } from './data/templates';

const selectedId = ref(new URLSearchParams(window.location.search).get('template'));
const isLoading = ref(true);
const selectedTemplate = computed(() => selectedId.value ? getTemplate(selectedId.value) : null);

window.setTimeout(() => {
     isLoading.value = false;
}, 900);

function selectTemplate(id) {
     isLoading.value = true;
     selectedId.value = String(id);
     window.history.pushState({}, '', `?template=${id}`);
     window.setTimeout(() => {
          isLoading.value = false;
     }, 650);
}

function showCatalog() {
     selectedId.value = null;
     window.history.pushState({}, '', window.location.pathname);
}
</script>

<template>
     <Transition name="loader">
          <div v-if="isLoading" class="app-loader" role="status" aria-live="polite">
               <div class="app-loader__pulse"><img src="/logo-transparan.png" alt="FDS" /></div>
               <span>Menyiapkan pengalaman undangan</span>
          </div>
     </Transition>
     <InvitationView v-if="selectedTemplate" :template="selectedTemplate" />
     <div v-else class="catalog-app">
          <header class="catalog-header">
               <a class="catalog-brand" href="." aria-label="FDS home"><img src="/logo-transparan.png" alt="FDS" /><span><strong>FDS</strong><small>Fintechno Development Solution</small></span></a>
               <span class="catalog-status">15 ready-to-use designs</span>
          </header>

          <main class="catalog-main">
               <section class="catalog-hero">
                    <div>
                         <span class="catalog-kicker">FDS collection / 2026</span>
                         <h1>Undangan yang terasa seperti <em>cerita kalian.</em></h1>
                         <p>Pilih template, buka preview-nya, lalu ubah data undangan dari satu struktur Vue yang ringan dan mudah dirawat.</p>
                    </div>
                    <div class="catalog-hero__note"><strong>15</strong><span>template siap dipanggil</span></div>
               </section>

               <section class="template-grid" aria-label="Daftar template">
                    <article v-for="template in templates" :key="template.id" class="template-card">
                         <div class="template-card__image"><img :src="template.heroImage" :alt="template.title" /><span>0{{ template.id }}</span></div>
                         <div class="template-card__body"><span class="catalog-kicker">Template {{ String(template.id).padStart(2, '0') }}</span><h2>{{ template.title }}</h2><p>{{ template.couple }}</p><button type="button" @click="selectTemplate(template.id)">Buka preview <span>↗</span></button></div>
                    </article>
               </section>
          </main>
          <footer class="catalog-footer">
               <div class="catalog-footer__brand">
                    <img src="/logo-transparan.png" alt="Fintechno Development Solution" />
                    <p>Fintechno Development Solution<br /><span>Crafted for meaningful moments.</span></p>
               </div>
               <div class="catalog-footer__links">
                    <a href="https://fintechnodevelopmentsolution-sudo.github.io/website-fds/" target="_blank" rel="noopener">Website</a>
                    <a href="https://www.instagram.com/fintechno_/" target="_blank" rel="noopener">Instagram</a>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener">Contact</a>
               </div>
               <small>© 2026 Fintechno Development Solution</small>
          </footer>
     </div>
</template>

<style scoped>
.app-loader { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; align-content: center; gap: 22px; color: #315b84; background: rgba(255, 255, 255, .96); backdrop-filter: blur(12px); font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.app-loader__pulse { display: grid; place-items: center; width: 132px; height: 132px; border: 1px solid rgba(43, 116, 174, .22); border-radius: 50%; animation: loader-pulse 1.5s ease-in-out infinite; }
.app-loader__pulse::before { position: absolute; width: 164px; height: 164px; border: 1px solid rgba(43, 116, 174, .1); border-radius: 50%; content: ''; animation: loader-ring 1.8s ease-out infinite; }
.app-loader img { width: 92px; height: auto; animation: loader-float 1.5s ease-in-out infinite; }
.loader-enter-active, .loader-leave-active { transition: opacity .35s ease; }
.loader-enter-from, .loader-leave-to { opacity: 0; }
.catalog-app { min-height: 100vh; color: #18324d; background: #fff; }
.catalog-header, .catalog-main, .catalog-footer { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
.catalog-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; border-bottom: 1px solid rgba(30, 91, 139, .12); }
.catalog-brand { display: flex; align-items: center; gap: 12px; color: inherit; text-decoration: none; }
.catalog-brand img { width: 132px; height: auto; }
.catalog-brand span { display: grid; gap: 2px; }
.catalog-brand strong { color: #1b5f91; font-size: .9rem; letter-spacing: .14em; }
.catalog-brand small { color: #6d879d; font-size: .68rem; font-weight: 600; letter-spacing: .05em; }
.catalog-status { color: #6d879d; font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; }
.catalog-main { padding: 82px 0 100px; }
.catalog-hero { display: grid; grid-template-columns: 1fr 180px; gap: 48px; align-items: end; margin-bottom: 62px; }
.catalog-kicker { color: #2672aa; font-size: .7rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.catalog-hero h1 { max-width: 780px; margin: 16px 0; font-family: Georgia, serif; font-size: clamp(3.1rem, 7vw, 6.8rem); font-weight: 500; letter-spacing: -.06em; line-height: .88; animation: hero-rise .8s cubic-bezier(.16, 1, .3, 1) both; }
.catalog-hero h1 em { color: #2378b5; font-style: italic; }
.catalog-hero p { max-width: 540px; margin: 0; color: #6d879d; line-height: 1.8; }
.catalog-hero__note { display: grid; gap: 4px; padding-left: 18px; border-left: 2px solid #2e83bd; color: #6d879d; animation: hero-rise .8s .15s cubic-bezier(.16, 1, .3, 1) both; }
.catalog-hero__note strong { color: #2378b5; font: 500 4.5rem/.8 Georgia, serif; }
.catalog-hero__note span { font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; }
.template-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.template-card { overflow: hidden; background: #fff; border: 1px solid rgba(30, 91, 139, .13); border-radius: 16px; box-shadow: 0 10px 28px rgba(31, 91, 137, .05); transition: transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s ease; animation: card-rise .7s both; }
.template-card:nth-child(2n) { animation-delay: .08s; }
.template-card:nth-child(3n) { animation-delay: .16s; }
.template-card:hover { box-shadow: 0 24px 50px rgba(31, 91, 137, .15); transform: translateY(-7px); }
.template-card__image { position: relative; aspect-ratio: 1.18; overflow: hidden; }
.template-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.16,1,.3,1); }
.template-card:hover img { transform: scale(1.06); }
.template-card__image span { position: absolute; top: 14px; right: 14px; padding: 8px 10px; color: #fff; background: rgba(24, 74, 113, .72); border-radius: 999px; font-size: .7rem; }
.template-card__body { padding: 22px; }
.template-card h2 { margin: 10px 0 4px; font: 500 2rem/1 Georgia, serif; }
.template-card p { margin: 0; color: #6d879d; }
.template-card button { margin-top: 22px; padding: 0; color: #2378b5; background: transparent; border: 0; border-bottom: 1px solid currentColor; cursor: pointer; font: 700 .78rem/2 Inter, sans-serif; }
.template-card button span { display: inline-block; margin-left: 7px; transition: transform .25s ease; }
.template-card button:hover span { transform: translate(3px, -3px); }
.catalog-footer { display: grid; grid-template-columns: 1.4fr 1fr auto; align-items: center; gap: 24px; padding: 34px 0 36px; color: #6d879d; border-top: 1px solid rgba(30, 91, 139, .12); font-size: .75rem; }
.catalog-footer__brand { display: flex; align-items: center; gap: 14px; }
.catalog-footer__brand img { width: 118px; height: auto; }
.catalog-footer__brand p { margin: 0; color: #1b5f91; font-weight: 800; line-height: 1.5; }
.catalog-footer__brand span { color: #6d879d; font-weight: 500; }
.catalog-footer__links { display: flex; justify-content: center; gap: 18px; }
.catalog-footer__links a { color: #2672aa; font-weight: 700; text-decoration: none; transition: color .2s ease, transform .2s ease; }
.catalog-footer__links a:hover { color: #153f63; transform: translateY(-2px); }
.catalog-footer small { text-align: right; }
@keyframes hero-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
@keyframes card-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes loader-pulse { 50% { box-shadow: 0 0 0 14px rgba(43, 116, 174, .05); transform: scale(1.05); } }
@keyframes loader-ring { from { opacity: .8; transform: scale(.7); } to { opacity: 0; transform: scale(1.25); } }
@keyframes loader-float { 50% { transform: translateY(-7px); } }
@media (max-width: 800px) { .template-grid { grid-template-columns: repeat(2, 1fr); } .catalog-hero { grid-template-columns: 1fr; } }
@media (max-width: 800px) { .catalog-footer { grid-template-columns: 1fr; gap: 18px; } .catalog-footer__links { justify-content: flex-start; } .catalog-footer small { text-align: left; } }
@media (max-width: 560px) { .catalog-header, .catalog-main, .catalog-footer { width: min(100% - 28px, 1180px); } .catalog-status { display: none; } .catalog-main { padding-top: 54px; } .template-grid { grid-template-columns: 1fr; } .catalog-footer__brand { align-items: flex-start; flex-direction: column; gap: 10px; } .catalog-footer__links { flex-wrap: wrap; } }
</style>
