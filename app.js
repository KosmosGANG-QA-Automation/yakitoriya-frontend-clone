const CATEGORIES = [
  { id: 'sushi', name: 'Суши', icon: '🍣' },
  { id: 'rolls', name: 'Роллы', icon: '🍙' },
  { id: 'sets', name: 'Сеты', icon: '🍱' },
  { id: 'pizza', name: 'Пицца', icon: '🍕' },
  { id: 'drinks', name: 'Напитки', icon: '🥤' },
];

const CITIES = ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск'];

const SLIDES = [
  { title: 'Скидка 20% на первый заказ', text: 'Промокод FIRST20 — действует при заказе от 1000 ₽', from: '#e4002b', to: '#ff7a45', emoji: '🍣' },
  { title: 'Сет «Филадельфия» в подарок', text: 'При заказе от 3000 ₽ по пятницам', from: '#1f2937', to: '#b45309', emoji: '🍱' },
  { title: 'Бесплатная доставка', text: 'На все заказы от 1500 ₽ по городу', from: '#047857', to: '#65a30d', emoji: '🛵' },
];

const PRODUCTS = [
  { id: 1, cat: 'sushi', name: 'Суши с лососем', desc: 'Рис, свежий лосось', weight: '40 г', price: 99, emoji: '🍣', c: ['#fb7185', '#fdba74'] },
  { id: 2, cat: 'sushi', name: 'Суши с угрём', desc: 'Рис, угорь, соус унаги', weight: '40 г', price: 119, emoji: '🍣', c: ['#92400e', '#f59e0b'] },
  { id: 3, cat: 'sushi', name: 'Суши с креветкой', desc: 'Рис, тигровая креветка', weight: '38 г', price: 109, emoji: '🍤', c: ['#f97316', '#fde68a'] },
  { id: 4, cat: 'sushi', name: 'Гункан с икрой', desc: 'Рис, нори, икра масаго', weight: '45 г', price: 129, emoji: '🍙', c: ['#dc2626', '#fb923c'] },
  { id: 5, cat: 'rolls', name: 'Филадельфия', desc: 'Лосось, сливочный сыр, огурец, рис', weight: '230 г', price: 459, emoji: '🍙', c: ['#f43f5e', '#fdba74'] },
  { id: 6, cat: 'rolls', name: 'Калифорния', desc: 'Краб, авокадо, огурец, икра тобико', weight: '220 г', price: 389, emoji: '🍥', c: ['#ea580c', '#fcd34d'] },
  { id: 7, cat: 'rolls', name: 'Запечённый с курицей', desc: 'Курица, сыр, соус спайси, унаги', weight: '250 г', price: 349, emoji: '🍘', c: ['#b45309', '#fbbf24'] },
  { id: 8, cat: 'rolls', name: 'Дракон', desc: 'Угорь, авокадо, огурец, кунжут', weight: '240 г', price: 499, emoji: '🐉', c: ['#15803d', '#a3e635'] },
  { id: 9, cat: 'sets', name: 'Сет «Токио»', desc: '32 ролла: Филадельфия, Калифорния, Дракон', weight: '960 г', price: 1490, emoji: '🍱', c: ['#e4002b', '#fb923c'] },
  { id: 10, cat: 'sets', name: 'Сет «Самурай»', desc: '24 ролла и 8 суши с лососем', weight: '1100 г', price: 1890, emoji: '🍱', c: ['#1f2937', '#e11d48'] },
  { id: 11, cat: 'sets', name: 'Сет «Для двоих»', desc: '16 роллов, 4 суши, имбирь, васаби', weight: '640 г', price: 990, emoji: '🥢', c: ['#7c3aed', '#f472b6'] },
  { id: 12, cat: 'pizza', name: 'Пепперони', desc: 'Пепперони, моцарелла, томатный соус', weight: '480 г', price: 649, emoji: '🍕', c: ['#dc2626', '#fbbf24'] },
  { id: 13, cat: 'pizza', name: 'Маргарита', desc: 'Томаты, моцарелла, базилик', weight: '450 г', price: 559, emoji: '🍕', c: ['#16a34a', '#fde047'] },
  { id: 14, cat: 'pizza', name: 'Четыре сыра', desc: 'Моцарелла, дор блю, пармезан, чеддер', weight: '470 г', price: 699, emoji: '🧀', c: ['#ca8a04', '#fef08a'] },
  { id: 15, cat: 'drinks', name: 'Морс клюквенный', desc: 'Домашний морс, 0,5 л', weight: '500 мл', price: 129, emoji: '🥤', c: ['#be123c', '#fb7185'] },
  { id: 16, cat: 'drinks', name: 'Чай зелёный', desc: 'Сенча, чайник на двоих', weight: '600 мл', price: 179, emoji: '🍵', c: ['#15803d', '#bef264'] },
  { id: 17, cat: 'drinks', name: 'Лимонад «Юдзу»', desc: 'Цитрус юдзу, мята, лёд', weight: '400 мл', price: 159, emoji: '🍋', c: ['#eab308', '#a3e635'] },
];

const $ = (id) => document.getElementById(id);
const fmt = (n) => n.toLocaleString('ru-RU') + ' ₽';
const cart = {};

function loadCart() {
  try { Object.assign(cart, JSON.parse(localStorage.getItem('cart') || '{}')); } catch (e) { /* ignore */ }
}
function saveCart() {
  try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) { /* ignore */ }
}

function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.remove('opacity-0');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.add('opacity-0'), 1800);
}

/* ---------- Slider ---------- */
function initSlider() {
  const root = $('slider');
  root.innerHTML = SLIDES.map((s, i) => `
    <div class="slide absolute inset-0 flex items-center px-6 sm:px-12 text-white ${i ? 'opacity-0' : ''}"
         style="background:linear-gradient(120deg,${s.from},${s.to})">
      <div class="max-w-xl z-10">
        <h2 class="text-2xl sm:text-4xl md:text-5xl font-black leading-tight">${s.title}</h2>
        <p class="mt-2 sm:mt-4 text-sm sm:text-lg opacity-90">${s.text}</p>
        <a href="#catalog" class="inline-block mt-4 sm:mt-6 px-6 py-3 bg-white text-stone-900 font-bold rounded-full hover:scale-105 transition">Заказать</a>
      </div>
      <div class="absolute right-4 sm:right-16 text-[7rem] sm:text-[12rem] md:text-[16rem] opacity-30 sm:opacity-90 select-none">${s.emoji}</div>
    </div>`).join('') +
    `<div class="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20" id="dots">
      ${SLIDES.map((_, i) => `<button data-i="${i}" class="w-2.5 h-2.5 rounded-full bg-white/50" aria-label="Слайд ${i + 1}"></button>`).join('')}
    </div>`;

  const slides = root.querySelectorAll('.slide');
  const dots = root.querySelectorAll('#dots button');
  let cur = 0, timer;
  const show = (i) => {
    cur = (i + SLIDES.length) % SLIDES.length;
    slides.forEach((s, k) => s.classList.toggle('opacity-0', k !== cur));
    dots.forEach((d, k) => d.classList.toggle('bg-white', k === cur));
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => show(cur + 1), 5000); };
  dots.forEach((d) => d.addEventListener('click', () => { show(+d.dataset.i); restart(); }));
  show(0);
  restart();
}

/* ---------- Categories & catalog ---------- */
function initCatalog() {
  $('categories').innerHTML = CATEGORIES.map((c) => `
    <a href="#cat-${c.id}" data-cat="${c.id}"
       class="cat-link shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-stone-200 font-semibold text-sm hover:border-brand hover:text-brand transition">
      <span class="text-lg">${c.icon}</span>${c.name}
    </a>`).join('');

  $('catalog').innerHTML = CATEGORIES.map((c) => `
    <div id="cat-${c.id}">
      <h2 class="text-2xl sm:text-3xl font-black mb-5">${c.name}</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        ${PRODUCTS.filter((p) => p.cat === c.id).map(card).join('')}
      </div>
    </div>`).join('');

  const links = document.querySelectorAll('.cat-link');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id.replace('cat-', '');
      links.forEach((l) => {
        const on = l.dataset.cat === id;
        l.classList.toggle('bg-brand', on);
        l.classList.toggle('text-white', on);
        l.classList.toggle('border-brand', on);
        if (on) l.scrollIntoView({ block: 'nearest', inline: 'center' });
      });
    });
  }, { rootMargin: '-140px 0px -70% 0px' });
  CATEGORIES.forEach((c) => io.observe($('cat-' + c.id)));
}

function card(p) {
  return `
    <article class="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col">
      <div class="aspect-square grid place-items-center text-6xl sm:text-8xl select-none"
           style="background:linear-gradient(135deg,${p.c[0]},${p.c[1]})" role="img" aria-label="${p.name}">${p.emoji}</div>
      <div class="p-3 sm:p-4 flex flex-col flex-1">
        <h3 class="font-bold text-sm sm:text-lg leading-tight">${p.name}</h3>
        <p class="text-xs sm:text-sm text-stone-500 mt-1 flex-1">${p.desc}</p>
        <div class="text-xs text-stone-400 mt-2">${p.weight}</div>
        <div class="mt-2 flex items-center justify-between gap-2 flex-wrap">
          <span class="font-black text-base sm:text-xl">${fmt(p.price)}</span>
          <button data-add="${p.id}" class="px-3 sm:px-4 py-2 rounded-full bg-brand hover:bg-brand-dark active:scale-95 text-white text-xs sm:text-sm font-bold transition">В корзину</button>
        </div>
      </div>
    </article>`;
}

/* ---------- Cart ---------- */
function totals() {
  let count = 0, sum = 0;
  for (const [id, qty] of Object.entries(cart)) {
    const p = PRODUCTS.find((x) => x.id == id);
    if (p) { count += qty; sum += qty * p.price; }
  }
  return { count, sum };
}

function renderCart() {
  const { count, sum } = totals();
  $('cartCount').textContent = count;
  $('cartTotal').textContent = fmt(sum);
  $('drawerTotal').textContent = fmt(sum);
  $('checkoutBtn').disabled = !count;

  const items = Object.entries(cart).map(([id, qty]) => {
    const p = PRODUCTS.find((x) => x.id == id);
    return `
      <div class="flex items-center gap-3">
        <div class="w-14 h-14 rounded-xl grid place-items-center text-2xl shrink-0" style="background:linear-gradient(135deg,${p.c[0]},${p.c[1]})">${p.emoji}</div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm truncate">${p.name}</div>
          <div class="text-xs text-stone-500">${fmt(p.price)}</div>
        </div>
        <div class="flex items-center gap-2">
          <button data-dec="${p.id}" class="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 font-bold">−</button>
          <span class="w-5 text-center text-sm font-bold">${qty}</span>
          <button data-inc="${p.id}" class="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 font-bold">+</button>
        </div>
      </div>`;
  });
  $('cartItems').innerHTML = items.length ? items.join('') : '<p class="text-stone-500 text-center mt-10">Корзина пуста. Добавьте что-нибудь вкусное 🍣</p>';
}

function change(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function openCart(open) {
  $('drawer').classList.toggle('translate-x-full', !open);
  $('overlay').classList.toggle('hidden', !open);
}

function init() {
  loadCart();
  initSlider();
  initCatalog();
  renderCart();

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      change(add.dataset.add, 1);
      const p = PRODUCTS.find((x) => x.id == add.dataset.add);
      toast(`«${p.name}» добавлено в корзину`);
      $('cartBtn').animate([{ transform: 'scale(1.12)' }, { transform: 'scale(1)' }], 250);
      return;
    }
    const inc = e.target.closest('[data-inc]');
    if (inc) return change(inc.dataset.inc, 1);
    const dec = e.target.closest('[data-dec]');
    if (dec) return change(dec.dataset.dec, -1);
    if (!e.target.closest('#cityBtn')) $('cityList').classList.add('hidden');
  });

  $('cartBtn').onclick = () => openCart(true);
  $('closeCart').onclick = $('overlay').onclick = () => openCart(false);
  $('checkoutBtn').onclick = () => {
    Object.keys(cart).forEach((k) => delete cart[k]);
    saveCart(); renderCart(); openCart(false);
    toast('Спасибо! Заказ оформлен (демо)');
  };

  $('cityList').innerHTML = CITIES.map((c) => `<li><button class="w-full text-left px-4 py-2 hover:bg-stone-100">${c}</button></li>`).join('');
  $('cityBtn').onclick = () => $('cityList').classList.toggle('hidden');
  $('cityList').onclick = (e) => {
    const b = e.target.closest('button');
    if (b) { $('cityName').textContent = b.textContent; $('cityList').classList.add('hidden'); }
  };

  const modal = $('loginModal');
  $('loginBtn').onclick = () => modal.classList.remove('hidden');
  $('closeLogin').onclick = () => modal.classList.add('hidden');
  modal.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };
  $('loginForm').onsubmit = (e) => { e.preventDefault(); modal.classList.add('hidden'); toast('Код отправлен (демо)'); };
}

init();
