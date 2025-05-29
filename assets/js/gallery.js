// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Gallery script loaded'); // Debug log

  const galleryModal = document.querySelector('[data-gallery-modal]');
  const modalOverlay = document.querySelector('[data-modal-overlay]');
  const modalCloseBtn = document.querySelector('[data-modal-close]');
  const modalImage = document.querySelector('.modal-image');
  const modalCaption = document.querySelector('.modal-caption');
  const projectLinks = document.querySelectorAll('.project-link');

  console.log('Found project links:', projectLinks.length); // Debug log

  // Open modal when clicking on project image
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      console.log('Project link clicked'); // Debug log
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling
      
      const img = this.querySelector('img');
      const title = this.querySelector('.project-title').textContent;
      const category = this.querySelector('.project-category').textContent;

      console.log('Image src:', img.src); // Debug log
      console.log('Title:', title); // Debug log
      console.log('Category:', category); // Debug log

      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalCaption.textContent = `${title} - ${category}`;
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal functions
  function closeModal() {
    console.log('Closing modal'); // Debug log
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalOverlay.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
      closeModal();
    }
  });
}); 