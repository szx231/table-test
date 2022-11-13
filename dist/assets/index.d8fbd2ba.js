(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === 'childList')
        for (const c of t.addedNodes) c.tagName === 'LINK' && c.rel === 'modulepreload' && r(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
      e.crossorigin === 'use-credentials'
        ? (t.credentials = 'include')
        : e.crossorigin === 'anonymous'
        ? (t.credentials = 'omit')
        : (t.credentials = 'same-origin'),
      t
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = s(e);
    fetch(e.href, t);
  }
})();
const E = async (n) => {
  try {
    const o = await fetch(n);
    return o.ok ? await o.json() : !1;
  } catch {
    return !1;
  }
};
const b = './data.json';
let f = [];
let h = 0;
let i = 40;
const y = 6;
const g = document.querySelector('thead');
const S = document.querySelector('tbody');
const a = document.querySelector('.search__input');
const l = document.querySelector('.search__button');
const m = document.querySelector('.notFound');
const d = document.querySelector('.wrapper');
const v = (n) => {
  E(n).then((o) => {
    q(o), p(o), (f = o);
  });
};
v(b);
const w = () => {
  m.classList.remove('notFound__show');
  const n = document.querySelectorAll('.tbody__tr').length;
  let o = [];
  document.querySelectorAll('.tbody__tr').forEach((s) => {
    s.classList.contains('item__hide') && o.push(!0);
  }),
    n === o.length && m.classList.add('notFound__show'),
    (o = []);
};
const C = () => {
  d.scrollHeight - (d.scrollTop + window.innerHeight) < 100 && ((h = i), (i += 10), p(f));
};
d.addEventListener('scroll', C);
const _ = () => {
  document.querySelectorAll('.tbody__tr').forEach((n) => {
    n.classList.remove('item__hide');
    const s = n.childNodes[3].innerText.toLowerCase();
    const r = a.value.toLowerCase().trim();
    s.includes(r) || n.classList.add('item__hide');
  }),
    w(),
    T();
};
const T = () => {
  a.value.length > 0 ? l.classList.add('hidde__btn') : l.classList.remove('hidde__btn');
};
const N = () => {
  (a.value = ''), _();
};
a.addEventListener('keyup', _);
l.addEventListener('click', N);
const q = (n) => {
  Object.keys(n[0]).forEach((s, r) => {
    if (r < y) {
      const e = document.createElement('tr');
      const t = document.createElement('td');
      t.innerHTML = `${s}`;
      const c = e.appendChild(t);
      c.classList.add('header__tr'), g.appendChild(c);
    }
  });
};
const p = (n) => {
  n.slice(h, i).forEach((o, s) => {
    if (s < i) {
      const r = [];
      Object.values(o).forEach((t, c) => {
        if (c < y) {
          const u = document.createElement('td');
          const L = typeof t === 'number' ? Math.round(t) : t;
          (u.innerHTML = `${L}`), r.push(u);
        }
      });
      const e = document.createElement('tr');
      r.forEach((t) => {
        e.appendChild(t);
      }),
        e.classList.add('tbody__tr'),
        S.appendChild(e);
    }
  });
};
