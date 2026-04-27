const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelectorAll('.nav-links a');
const currentPage = document.body.dataset.page;

if (mobileToggle && sidebar) {
  mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');

    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.className = sidebar.classList.contains('show') ? 'bi bi-x-lg' : 'bi bi-list';
    }
  });
}

navLinks.forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add('active');
  }

  link.addEventListener('click', () => {
    if (window.innerWidth <= 991 && sidebar) {
      sidebar.classList.remove('show');

      const icon = mobileToggle?.querySelector('i');
      if (icon) icon.className = 'bi bi-list';
    }
  });
});

document.addEventListener('click', (event) => {
  if (!sidebar || !mobileToggle) return;

  const clickedOutside = !sidebar.contains(event.target) && !mobileToggle.contains(event.target);

  if (clickedOutside && window.innerWidth <= 991) {
    sidebar.classList.remove('show');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'bi bi-list';
  }
});

const aboutText = `I am a 33-year-old frontend-focused developer with a strong foundation in computer science and web development. I have experience building responsive and user-friendly interfaces using modern web technologies, with a particular interest in clean design and intuitive user experiences.

Alongside my technical skills, I bring valuable experience from leadership roles, which have strengthened my communication, problem-solving, and ability to work under pressure.`;

const typingText = document.getElementById('typingText');
let index = 0;

function typeAboutText() {
  if (!typingText) return;

  if (index < aboutText.length) {
    typingText.textContent += aboutText.charAt(index);
    index += 1;
    setTimeout(typeAboutText, 24);
  }
}

window.addEventListener('load', typeAboutText);

const galleryData = {
  'project-1': [
    { src: 'assets/project-1/image-1.png', alt: 'Century image 1', caption: 'Century 21 — Image 1 of 4' },
    { src: 'assets/project-1/image-2.png', alt: 'Century image 2', caption: 'Century 21 — Image 2 of 4' },
    { src: 'assets/project-1/image-3.png', alt: 'Century image 3', caption: 'Century 21 — Image 3 of 4' },
    { src: 'assets/project-1/image-4.png', alt: 'Century image 4', caption: 'Century 21 — Image 4 of 4' }
  ],
  'project-2': [
    { src: 'assets/project-2/image-1.png', alt: 'Donutopia image 1', caption: 'Donutopia — Image 1 of 4' },
    { src: 'assets/project-2/image-2.png', alt: 'Donutopia image 2', caption: 'Donutopia — Image 2 of 4' },
    { src: 'assets/project-2/image-3.png', alt: 'Donutopia image 3', caption: 'Donutopia — Image 3 of 4' },
    { src: 'assets/project-2/image-4.png', alt: 'Donutopia image 4', caption: 'Donutopia — Image 4 of 4' }
  ],
  'project-3': [
    { src: 'assets/project-3/image-1.png', alt: 'Cars image 1', caption: 'Rental Cars — Image 1 of 4' },
    { src: 'assets/project-3/image-2.png', alt: 'Cars image 2', caption: 'Rental Cars — Image 2 of 4' },
    { src: 'assets/project-3/image-3.png', alt: 'Cars image 3', caption: 'Rental Cars — Image 3 of 4' },
    { src: 'assets/project-3/image-4.png', alt: 'Cars image 4', caption: 'Rental Cars — Image 4 of 4' }
  ],
  'project-4': [
    { src: 'assets/project-4/image-1.png', alt: 'Pintoflix image 1', caption: 'Pintoflix — Image 1 of 4' },
    { src: 'assets/project-4/image-2.png', alt: 'Pintoflix image 2', caption: 'Pintoflix — Image 2 of 4' },
    { src: 'assets/project-4/image-3.png', alt: 'Pintoflix image 3', caption: 'Pintoflix — Image 3 of 4' },
    { src: 'assets/project-4/image-4.png', alt: 'Pintoflix image 4', caption: 'Pintoflix — Image 4 of 4' }
  ],
  'project-5': [
    { src: 'assets/project-5/image-1.png', alt: 'Flappy Bird Clone image 1', caption: 'Flappy Bird Clone — Image 1 of 4' },
    { src: 'assets/project-5/image-2.png', alt: 'Flappy Bird Clone image 2', caption: 'Flappy Bird Clone — Image 2 of 4' },
    { src: 'assets/project-5/image-3.png', alt: 'Flappy Bird Clone image 3', caption: 'Flappy Bird Clone — Image 3 of 4' },
    { src: 'assets/project-5/image-4.png', alt: 'Flappy Bird Clone image 4', caption: 'Flappy Bird Clone — Image 4 of 4' }
  ]
};

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryButtons = document.querySelectorAll('.gallery-link');

let activeGallery = [];
let activeIndex = 0;

function updateLightboxImage() {
  if (!lightboxImg || !lightboxCaption || activeGallery.length === 0) return;

  const image = activeGallery[activeIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxCaption.textContent = image.caption;
}

function openLightbox(galleryName, imageIndex) {
  if (!lightbox || !galleryData[galleryName]) return;

  activeGallery = galleryData[galleryName];
  activeIndex = imageIndex;

  updateLightboxImage();

  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');

  if (lightboxClose) lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');

  if (lightboxImg) {
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }
}

function showPreviousImage() {
  if (activeGallery.length === 0) return;
  activeIndex = activeIndex === 0 ? activeGallery.length - 1 : activeIndex - 1;
  updateLightboxImage();
}

function showNextImage() {
  if (activeGallery.length === 0) return;
  activeIndex = activeIndex === activeGallery.length - 1 ? 0 : activeIndex + 1;
  updateLightboxImage();
}

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const galleryName = button.dataset.gallery;
    const imageIndex = Number(button.dataset.index);
    openLightbox(galleryName, imageIndex);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', showPreviousImage);
if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (event) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showPreviousImage();
  if (event.key === 'ArrowRight') showNextImage();
});
