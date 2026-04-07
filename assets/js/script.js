'use strict';

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', function () {
  this.classList.toggle('active');
  navList.classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navList.classList.remove('active');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

// Header background on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Portfolio filter
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const value = this.textContent.toLowerCase();

    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    filterItems.forEach(item => {
      if (value === 'all' || value === item.dataset.category) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});

// Gallery modal
document.addEventListener('DOMContentLoaded', function () {
  const galleryModal = document.querySelector('[data-gallery-modal]');
  const modalOverlay = document.querySelector('[data-modal-overlay]');
  const modalCloseBtn = document.querySelector('[data-modal-close]');
  const modalImage = document.querySelector('.gallery-modal-image');
  const modalCaption = document.querySelector('.gallery-modal-caption');
  const projectLinks = document.querySelectorAll('.project-link');

  projectLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const img = this.querySelector('img');
      const title = this.querySelector('.project-title').textContent;
      const category = this.querySelector('.project-category').textContent;

      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalCaption.textContent = title + ' - ' + category;
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalOverlay.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Scroll reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .skill-item, .info-card, .resume-block, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});

// Add revealed style
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);
