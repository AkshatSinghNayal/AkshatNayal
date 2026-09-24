// Official Cal.com HTML embed queue, loaded only near the contact section.
(function (C, A, L) {
  const p = function (a, ar) { a.q.push(ar); };
  const d = C.document;
  C.Cal = C.Cal || function () {
    const cal = C.Cal;
    const ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      const script = d.createElement('script');
      script.src = A;
      script.async = true;
      script.onerror = () => {
        d.getElementById('cal-booking').textContent = 'Please use the link below to open the booking calendar.';
      };
      d.head.appendChild(script);
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === 'string') {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ['initNamespace', namespace]);
      } else {
        p(cal, ar);
      }
      return;
    }
    p(cal, ar);
  };
})(window, 'https://app.cal.com/embed/embed.js', 'init');

const contactStyle = getComputedStyle(document.getElementById('contact'));
const background = contactStyle.getPropertyValue('--bg--color').trim();
const brandColor = contactStyle.getPropertyValue('--booking-brand-color').trim();
// The HTML fallback link is the single source for the booking event.
const calLink = new URL(document.getElementById('cal-booking-link').href).pathname.slice(1);

window.Cal('init', 'contact', { origin: 'https://app.cal.com' });
window.Cal.ns.contact('inline', {
  elementOrSelector: '#cal-booking',
  calLink,
  config: { theme: 'dark', layout: 'month_view', tz: 'Asia/Kolkata' },
});
window.Cal.ns.contact('ui', {
  theme: 'dark',
  layout: 'month_view',
  hideEventTypeDetails: false,
  styles: { body: { background } },
  cssVarsPerTheme: {
    dark: {
      'cal-brand': brandColor,
      'cal-brand-emphasis': brandColor,
      'cal-brand-text': '#10101a',
      'cal-bg': background,
      'cal-bg-emphasis': '#0b0b13',
      'cal-bg-subtle': background,
      'cal-bg-muted': background,
      'cal-border': 'rgba(255, 255, 255, 0.05)',
      'cal-border-booker': 'transparent',
      'cal-radius': '8px',
    },
  },
});
