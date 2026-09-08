// ===== MATRIX CANVAS BACKGROUND =====
(function() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;
  const chars = '01アイウエオカキクケコサシスセソ';

  function init() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / 20);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(10,15,30,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#2dd4bf';
    ctx.font = '14px JetBrains Mono, monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 20, y * 20);
      if (y * 20 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  init();
  window.addEventListener('resize', init);
  setInterval(draw, 50);
})();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// ===== PROGRESS BARS =====
function animateProgressBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const width = bar.dataset.width;
    setTimeout(() => { bar.style.width = width + '%'; }, 100);
  });
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counters
      entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
        if (!el.dataset.animated) {
          el.dataset.animated = 'true';
          animateCounter(el);
        }
      });
      // Trigger progress bars
      if (entry.target.querySelector && entry.target.querySelector('.progress-bar')) {
        animateProgressBars();
      }
    }
  });
}, { threshold: 0.1 });

// Observe all sections and cards
document.querySelectorAll('.section, .profile-card, .terminal-card, .quick-card, .repo-card, .skill-cat, .contact-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Also observe stats
const statsRow = document.querySelector('.stats-row');
if (statsRow) {
  observer.observe(statsRow);
}

// Observe progress section
const progressSection = document.querySelector('.progress-section');
if (progressSection) {
  progressSection.classList.add('reveal');
  observer.observe(progressSection);
}

// ===== COPY EMAIL =====
function copyEmail() {
  const email = 'trancaotrong456@gmail.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(showToast);
  } else {
    const ta = document.createElement('textarea');
    ta.value = email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast();
  }
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== HIRE BUTTON =====
document.getElementById('hire-btn')?.addEventListener('click', () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
});

// ===== MOUSE PARALLAX ON HERO ===== 
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.bg-orb');
  const cx = e.clientX / window.innerWidth - 0.5;
  const cy = e.clientY / window.innerHeight - 0.5;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 15;
    orb.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
  });
});

// ===== SMOOTH ACTIVE NAV LINKS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#2dd4bf';
    }
  });
});

// ===== REPO CARD HOVER GLOW =====
document.querySelectorAll('.repo-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
