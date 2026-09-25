document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');

  if (stored === 'light') {
    document.body.classList.add('light');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const theme = document.body.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
    });
  }

  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
