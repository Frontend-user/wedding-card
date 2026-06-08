<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import heroMain from './images/main.jpg'
import heroMain2 from './images/main2.jpg'
import { GOOGLE_FORM_ACTION, buildGoogleFormBody } from './config/googleForm'

const guestFormStatus = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function onGuestSubmit(ev: Event) {
  const form = ev.target as HTMLFormElement
  const fd = new FormData(form)
  const attendance = String(fd.get('attendance') ?? '')
  const guestNames = String(fd.get('guest_names') ?? '')

  if (!attendance.trim()) return

  guestFormStatus.value = 'sending'
  try {
    const body = buildGoogleFormBody(attendance, guestNames).toString()
    await fetch(GOOGLE_FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body,
    })
    guestFormStatus.value = 'sent'
    form.reset()
  } catch {
    guestFormStatus.value = 'error'
  }
}

function openWedding() {
  const music = document.getElementById('bgMusic') as HTMLAudioElement | null
  void music?.play().catch(() => {})
  const overlay = document.getElementById('envelope-overlay')
  overlay?.classList.add('is-open')
  document.body.style.overflow = 'auto'
  setTimeout(() => {
    if (overlay) overlay.style.display = 'none'
  }, 2000)
}

function updateTimer() {
  const diff = new Date('August 8, 2026 00:00:00').getTime() - Date.now()
  const daysEl = document.getElementById('days')
  const hoursEl = document.getElementById('hours')
  const minutesEl = document.getElementById('minutes')
  const secondsEl = document.getElementById('seconds')
  if (diff > 0 && daysEl && hoursEl && minutesEl && secondsEl) {
    daysEl.textContent = String(Math.floor(diff / 86400000))
    hoursEl.textContent = String(Math.floor((diff % 86400000) / 3600000))
    minutesEl.textContent = String(Math.floor((diff % 3600000) / 60000))
    secondsEl.textContent = String(Math.floor((diff % 60000) / 1000))
  }
}

let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active')
      })
    },
    { threshold: 0.1 },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  intervalId = window.setInterval(updateTimer, 1000)
  updateTimer()
})

onUnmounted(() => {
  if (intervalId !== undefined) window.clearInterval(intervalId)
})
</script>

<template>
  <audio id="bgMusic" src="/music.mp3" loop />

  <div id="envelope-overlay" class="is-open" style="display: none">
    <div class="envelope-card">
      <div class="flap flap-top">
        <div class="crest-embossed">
          <div class="monogram-ka">KA</div>
        </div>
      </div>
      <div class="pearl-center" role="button" tabindex="0" @click="openWedding" @keydown.enter="openWedding" />
      <div class="flap flap-bottom">
        <div class="open-instruction">нажмите чтобы увидеть пригласительное</div>
      </div>
    </div>
  </div>

  <div class="main-content">
    <section class="img-block reveal active">
      <img
        :src="heroMain"
        class="hero-img-bg"
        alt="Карен и Анна"
        @error="($event.target as HTMLImageElement).src = 'https://via.placeholder.com/800x1200?text=K+A+PHOTO'"
      >
      <div class="fog-effect" />
      <div class="overlay-content">
        <div class="hero-kicker">ПРИГЛАШЕНИЕ НА СВАДЬБУ</div>
        <h1 class="script-header hero-names">Карен &amp; Анна</h1>
      </div>
    </section>

    <section class="section reveal active">
      <div class="script-header">Дорогие гости!</div>
      <div class="body-text">
        Этот момент наконец настал — мы хотим, чтобы вы стали частью самого счастливого и значимого дня в нашей жизни.
      </div>
      <div class="body-text body-text-bold">
        Приглашаем вас на нашу свадьбу, которая состоится уже совсем скоро!
      </div>
    </section>

    <section class="section reveal active section-calendar">
      <div class="script-header">Август 2026</div>
      <div class="calendar-grid">
        <div class="weekday">Пн</div>
        <div class="weekday">Вт</div>
        <div class="weekday">Ср</div>
        <div class="weekday">Чт</div>
        <div class="weekday">Пт</div>
        <div class="weekday">Сб</div>
        <div class="weekday">Вс</div>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div class="day">1</div>
        <div class="day">2</div>
        <div class="day">3</div>
        <div class="day">4</div>
        <div class="day">5</div>
        <div class="day">6</div>
        <div class="day">7</div>
        <div class="day wedding-day">8</div>
        <div class="day">9</div>
        <div class="day">10</div>
        <div class="day">11</div>
        <div class="day">12</div>
        <div class="day">13</div>
        <div class="day">14</div>
        <div class="day">15</div>
        <div class="day">16</div>
        <div class="day">17</div>
        <div class="day">18</div>
        <div class="day">19</div>
        <div class="day">20</div>
        <div class="day">21</div>
        <div class="day">22</div>
        <div class="day">23</div>
        <div class="day">24</div>
        <div class="day">25</div>
        <div class="day">26</div>
        <div class="day">27</div>
        <div class="day">28</div>
        <div class="day">29</div>
        <div class="day">30</div>
        <div class="day">31</div>
      </div>
    </section>

    <section class="section reveal active section-program">
      <div class="script-header">Программа дня</div>
      <div class="program-timeline">
        <article class="program-item">
          <div class="program-dot" aria-hidden="true" />
          <div class="program-body">
            <div class="program-time">11:30</div>
            <div class="program-title">Утро невесты</div>
            <div class="program-place">Королёв, Ул. Гайдара д. 18</div>
            <a href="https://yandex.ru/maps/-/CPXo6Znh" target="_blank" rel="noopener noreferrer" class="btn-map">На карте</a>
          </div>
        </article>
        <article class="program-item">
          <div class="program-dot" aria-hidden="true" />
          <div class="program-body">
            <div class="program-time">15:30</div>
            <div class="program-title">Венчание</div>
            <div class="program-place">Москва, Олимпийский просп., 9</div>
            <a href="https://yandex.ru/maps/-/CPXoeWkr" target="_blank" rel="noopener noreferrer" class="btn-map">На карте</a>
          </div>
        </article>
        <article class="program-item">
          <div class="program-dot" aria-hidden="true" />
          <div class="program-body">
            <div class="program-time">17:30</div>
            <div class="program-title">Сбор гостей</div>
            <div class="program-place">Ресторан «Зелёная роща»</div>
            <a href="https://yandex.ru/maps/-/CPU4J07Z" target="_blank" rel="noopener noreferrer" class="btn-map">На карте</a>
          </div>
        </article>
        <article class="program-item">
          <div class="program-dot" aria-hidden="true" />
          <div class="program-body">
            <div class="program-time">18:00</div>
            <div class="program-title">Начало банкета</div>
            <div class="program-place">Ресторан «Зелёная роща»</div>
            <a
              href="https://yandex.ru/maps/org/zelyonaya_roshcha/1393290590/?ll=37.725639%2C55.996505&amp;z=14"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-map"
            >На карте</a>
          </div>
        </article>
      </div>
    </section>

    <section class="img-block reveal active">
      <img
        :src="heroMain2"
        class="hero-img-bg"
        alt="Карен и Анна"
        @error="($event.target as HTMLImageElement).src = 'https://via.placeholder.com/800x1200?text=Timer+Photo'"
      >
      <div class="fog-effect" />
      <div class="overlay-content">
        <div class="script-header timer-heading">Осталось до свадьбы:</div>
        <div id="timer" class="timer-row">
          <div class="timer-cell">
            <span id="days" class="timer-value">0</span>
            <span class="timer-label">дней</span>
          </div>
          <div class="timer-cell">
            <span id="hours" class="timer-value">0</span>
            <span class="timer-label">часов</span>
          </div>
          <div class="timer-cell">
            <span id="minutes" class="timer-value">0</span>
            <span class="timer-label">минут</span>
          </div>
          <div class="timer-cell">
            <span id="seconds" class="timer-value">0</span>
            <span class="timer-label">секунд</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section reveal active">
      <div class="script-header dress-code-heading">Дресс-код: свободный</div>
      <div class="body-text">
        Мы не устанавливаем ограничений по цветовой гамме и стилю. Приветствуется любой наряд, в котором вам комфортно и радостно разделить с нами этот день.
      </div>
    </section>

    <section class="section reveal active section-form">
      <div class="script-header">Анкета гостя</div>
      <p class="body-text form-intro">
        Дорогие гости! Чтобы наш праздник прошёл идеально, пожалуйста, подтвердите своё присутствие до
        <br>
        1 августа 2026 года.
      </p>
      <form class="guest-form" @submit.prevent="onGuestSubmit">
        <div class="form-group">
          <label class="radio-card">
            <input type="radio" name="attendance" value="Буду один / одна" required class="radio-input">
            <span class="radio-card__text">Буду один / одна</span>
          </label>
        </div>
        <div class="form-group">
          <label class="radio-card">
            <input type="radio" name="attendance" value="Буду с семьёй" class="radio-input">
            <span class="radio-card__text">Буду с семьёй</span>
          </label>
        </div>
        <div class="form-group">
          <label class="radio-card">
            <input type="radio" name="attendance" value="К сожалению, не смогу приехать" class="radio-input">
            <span class="radio-card__text">К сожалению, не смогу приехать</span>
          </label>
        </div>

        <div class="names-label">Фамилия и имя (перечислите всех)</div>
        <textarea
          name="guest_names"
          rows="4"
          placeholder="Например: Иван и Мария Ивановы"
          required
          class="text-input-area"
        />
        <p v-if="guestFormStatus === 'sent'" class="form-feedback form-feedback-success">
          Спасибо! Ответ отправлен.
        </p>
        <p v-else-if="guestFormStatus === 'error'" class="form-feedback form-feedback-error">
          Не удалось отправить. Попробуйте ещё раз или напишите нам напрямую.
        </p>
        <button type="submit" class="submit-btn" :disabled="guestFormStatus === 'sending'">
          {{ guestFormStatus === 'sending' ? 'Отправка…' : 'Отправить' }}
        </button>
      </form>
    </section>
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p class="site-footer__script">Карен <span class="site-footer__amp">&amp;</span> Анна</p>
        <p class="site-footer__meta">2026</p>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --pearl: #fdfcf9;
  --text-dark: #000;
  --gold: #c5a059;
  --gold-soft: rgba(197, 160, 89, 0.22);
  --gold-muted: rgba(197, 160, 89, 0.12);
  --bg-page: #e8e4df;
  --divider: rgba(0, 0, 0, 0.07);
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

html,
body {
  width: 100%;
  min-height: 100%;
  background-color: var(--bg-page);
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
}

#app {
  min-height: 100%;
}

/* Доступность: видимый фокус клавиатуры */
:where(a, button, textarea, input:not(.radio-input), .pearl-center):focus {
  outline: none;
}

:where(a, button, textarea, input:not(.radio-input), .pearl-center):focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}

#envelope-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-page);
  transition: opacity 1s ease-in-out;
}

.envelope-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.05);
}

.flap {
  position: absolute;
  width: 100%;
  background: #fff;
  background-image: url('https://www.transparenttextures.com/patterns/cream-pixels.png');
  transition: transform 1.5s var(--ease-out);
  display: flex;
  justify-content: center;
  align-items: center;
}

.flap-top {
  top: 0;
  height: 60%;
  z-index: 5;
  clip-path: polygon(0 0, 100% 0, 100% 60%, 50% 90%, 0 60%);
  filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.1));
  border-bottom: 1px solid rgba(0, 0, 0, 0.02);
}

.flap-bottom {
  bottom: 0;
  height: 50%;
  z-index: 4;
  clip-path: polygon(0 40%, 50% 10%, 100% 40%, 100% 100%, 0 100%);
  background-color: #f9f9f9;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 140px;
}

.crest-embossed {
  width: 200px;
  height: 260px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  border-radius: 50% / 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.02);
  margin-bottom: 100px;
}

.monogram-ka {
  font-family: 'Great Vibes', cursive;
  font-size: 110px;
  color: #eee7e0;
  text-shadow: 1px 1px 0 #fff;
  margin-top: 10px;
}

.pearl-center {
  width: 55px;
  height: 55px;
  background: radial-gradient(circle at 35% 35%, #fff 0%, #f0f0f0 45%, #b3b3b3 100%);
  border-radius: 50%;
  position: absolute;
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 10;
  cursor: pointer;
}

.pearl-center:focus:not(:focus-visible) {
  outline: none;
}

.open-instruction {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 18px;
  color: #aaa;
  text-align: center;
  z-index: 6;
  pointer-events: none;
}

.is-open .flap-top {
  transform: translateY(-110%);
}

.is-open .flap-bottom {
  transform: translateY(110%);
}

.is-open#envelope-overlay {
  opacity: 0;
  pointer-events: none;
}

.main-content {
  max-width: 480px;
  margin: 0 auto;
  background-color: var(--pearl);
  min-height: 100vh;
  min-height: 100dvh;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.reveal {
  opacity: 0;
  transform: translateY(22px);
  filter: blur(6px);
  transition:
    opacity 0.75s var(--ease-out),
    transform 0.75s var(--ease-out),
    filter 0.75s var(--ease-out);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: opacity 0.35s ease;
    transform: none;
    filter: none;
  }

  .flap {
    transition-duration: 0.35s;
  }

  #envelope-overlay {
    transition-duration: 0.35s;
  }

  .submit-btn:active:not(:disabled) {
    transform: none;
  }
}

.img-block {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #000;
}

.hero-img-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  image-rendering: auto;
}

.fog-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 38%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(253, 252, 249, 0.35) 45%,
    var(--pearl) 92%
  );
  z-index: 2;
}

.overlay-content {
  position: relative;
  z-index: 3;
  text-align: center;
  padding-bottom: 50px;
}

.script-header {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(2.5rem, 10vw, 3.45rem);
  line-height: 1.12;
  color: #000;
  margin-bottom: 25px;
  text-align: center;
  padding-inline: 8px;
  margin-inline: auto;
  max-width: 100%;
}

.hero-kicker {
  font-size: 11px;
  letter-spacing: 0.42em;
  color: #4a4a4a;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
}

.hero-names {
  font-size: clamp(3.25rem, 12vw, 4.1rem);
  margin-bottom: 0;
  max-width: none;
}

.section {
  padding: 72px 28px 80px;
  text-align: center;
  border-top: 1px solid var(--divider);
}

.img-block + .section {
  border-top: none;
}

.section-calendar {
  padding-top: 0;
}

.section-program {
  background: #fff;
}

.body-text {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  line-height: 1.8;
  color: #333;
  max-width: 32em;
  margin-inline: auto;
}

.body-text-bold {
  font-weight: bold;
  margin-top: 25px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-width: 320px;
  margin: 0 auto;
  gap: 10px;
}

.weekday {
  font-size: 10px;
  color: #aaa;
  text-transform: uppercase;
  padding-bottom: 10px;
}

.day {
  font-size: 17px;
  padding: 10px 0;
  position: relative;
  z-index: 1;
}

.wedding-day {
  color: #fff !important;
  font-weight: bold;
}

.wedding-day::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 46px;
  height: 46px;
  background-color: var(--gold);
  -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 2 7.5 2c1.74 0 3.41 0.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>")
    no-repeat center;
  mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 2 7.5 2c1.74 0 3.41 0.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>")
    no-repeat center;
  z-index: -1;
  opacity: 1;
}

.btn-map {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 148px;
  padding: 12px 22px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: #3a3a3a;
  font-size: 13px;
  font-weight: 500;
  background: #fff;
  margin-top: 16px;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.btn-map:hover {
  border-color: var(--gold);
  color: #1a1a1a;
  box-shadow: 0 2px 12px var(--gold-muted);
  background: #fffef9;
}

.program-timeline {
  position: relative;
  text-align: left;
  max-width: 360px;
  margin: 0 auto;
  padding-left: 8px;
}

.program-timeline::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 8px;
  bottom: 12px;
  width: 1px;
  background: linear-gradient(to bottom, var(--gold), rgba(197, 160, 89, 0.2));
}

.program-item {
  position: relative;
  display: flex;
  gap: 18px;
  margin-bottom: 44px;
}

.program-item:last-child {
  margin-bottom: 0;
}

.program-dot {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--pearl);
  border: 2px solid var(--gold);
  box-shadow: 0 0 0 3px var(--gold-muted);
  z-index: 1;
}

.program-body {
  flex: 1;
  min-width: 0;
}

.program-time {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.program-title {
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 10px 0 6px;
  font-size: 13px;
}

.program-place {
  font-style: italic;
  color: #666;
  font-size: 14px;
  line-height: 1.45;
}

.timer-heading {
  color: #000;
}

.timer-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-cell {
  padding: 0 10px;
  border-left: 1px solid rgba(197, 160, 89, 0.25);
}

.timer-row .timer-cell:first-child {
  border-left: none;
}

.timer-value {
  font-size: 32px;
  font-weight: 700;
  display: block;
}

.timer-label {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.6;
}

.dress-code-heading {
  font-size: clamp(2rem, 8.5vw, 3.35rem);
  line-height: 1.15;
  max-width: 15ch;
  margin-inline: auto;
}

.section-form {
  background: #fff;
  padding-bottom: 100px;
}

.form-group {
  margin-bottom: 10px;
}

.radio-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: #fafaf8;
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.radio-card:hover {
  border-color: rgba(197, 160, 89, 0.35);
  background: #fffefb;
}

.radio-card:has(.radio-input:checked) {
  border-color: rgba(197, 160, 89, 0.35);
  background: #fdfcf9;
}

.radio-card:focus-within {
  border-color: rgba(197, 160, 89, 0.45);
}

.radio-card:has(.radio-input:checked):focus-within {
  border-color: rgba(197, 160, 89, 0.4);
}

.radio-card__text {
  font-size: 15px;
  line-height: 1.45;
  color: #222;
  padding-top: 1px;
}

.radio-input {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin-top: 4px;
  flex-shrink: 0;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.radio-input:hover {
  border-color: rgba(197, 160, 89, 0.55);
}

.radio-input:checked {
  border-color: var(--gold);
  background: radial-gradient(circle at center, var(--gold) 42%, #fff 44%);
  box-shadow: none;
}

.radio-input:focus {
  outline: none;
}

.radio-input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--gold-soft);
}

.form-intro {
  margin-bottom: 40px;
  padding: 0 10px;
}

.guest-form {
  text-align: left;
  max-width: 350px;
  margin: 0 auto;
}

.text-input-area {
  display: block;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  line-height: 1.5;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 12px 14px;
  margin: 12px 0 16px;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  color: #222;
  background: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.text-input-area:hover {
  border-color: rgba(197, 160, 89, 0.35);
}

.text-input-area:focus {
  outline: none;
}

.text-input-area:focus-visible {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-soft);
}

.form-feedback {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px;
  text-align: center;
}

.form-feedback-success {
  color: #2e7d32;
}

.form-feedback-error {
  color: #c62828;
}

.submit-btn {
  width: 100%;
  padding: 16px 18px;
  border: none;
  border-radius: 14px;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: none;
  line-height: 1.25;
  color: #fff;
  -webkit-text-fill-color: #fff;
  background: linear-gradient(145deg, #d4b575 0%, #c5a059 45%, #a88642 100%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.35) inset,
    0 4px 14px rgba(197, 160, 89, 0.35);
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  transition:
    filter 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

.submit-btn:hover:not(:disabled) {
  color: #fff;
  -webkit-text-fill-color: #fff;
  filter: brightness(1.05);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.4) inset,
    0 6px 22px rgba(197, 160, 89, 0.45);
}

.submit-btn:active:not(:disabled) {
  color: #fff;
  -webkit-text-fill-color: #fff;
  filter: brightness(0.97);
  transform: scale(0.99);
}

.submit-btn:disabled {
  color: rgba(255, 255, 255, 0.88);
  -webkit-text-fill-color: rgba(255, 255, 255, 0.88);
  opacity: 0.72;
  cursor: not-allowed;
  filter: grayscale(0.15);
}

.names-label {
  margin-top: 20px;
  font-weight: bold;
  font-size: 14px;
  color: #000;
}

.site-footer {
  position: relative;
  text-align: center;
  padding: 32px 24px calc(28px + env(safe-area-inset-bottom, 0px));
  margin-top: 8px;
  background: linear-gradient(180deg, var(--pearl) 0%, #f3efe8 55%, var(--bg-page) 100%);
  border-top: 1px solid rgba(197, 160, 89, 0.22);
}

.site-footer::before {
  content: '';
  display: block;
  width: 56px;
  height: 3px;
  margin: 0 auto 20px;
  border-radius: 3px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.85;
}

.site-footer__inner {
  max-width: 280px;
  margin: 0 auto;
}

.site-footer__script {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(1.75rem, 7vw, 2.25rem);
  color: #2c2c2c;
  line-height: 1.2;
  margin: 0 0 6px;
}

.site-footer__amp {
  font-size: 0.85em;
  opacity: 0.85;
}

.site-footer__meta {
  font-family: Montserrat, sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8a8278;
  margin: 0;
}
</style>
