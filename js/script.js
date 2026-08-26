const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelectorAll('.nav-links a');
const currentPage = document.body.dataset.page;

if (mobileToggle && sidebar) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('show');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
  });
}

navLinks.forEach((link) => {
  if (link.dataset.page === currentPage) link.classList.add('active');

  link.addEventListener('click', () => {
    if (window.innerWidth <= 991 && sidebar) {
      sidebar.classList.remove('show');
      mobileToggle?.setAttribute('aria-expanded', 'false');
      const icon = mobileToggle?.querySelector('i');
      if (icon) icon.className = 'bi bi-list';
    }
  });
});

document.addEventListener('click', (event) => {
  if (!sidebar || !mobileToggle || window.innerWidth > 991) return;
  if (!sidebar.classList.contains('show')) return;

  const clickedOutside = !sidebar.contains(event.target) && !mobileToggle.contains(event.target);
  if (clickedOutside) {
    sidebar.classList.remove('show');
    mobileToggle.setAttribute('aria-expanded', 'false');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'bi bi-list';
  }
});

// Reveal content as it enters the viewport. Falls back gracefully on older browsers.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Portfolio lightbox data. Paths intentionally match the existing project asset structure.
const galleryData = {
  'project-1': [
    { src: 'assets/project-1/image-1.png', alt: 'WorkApp interface preview 1', caption: 'WorkApp — 1 of 4' },
    { src: 'assets/project-1/image-2.png', alt: 'WorkApp interface preview 2', caption: 'WorkApp — 2 of 4' },
    { src: 'assets/project-1/image-3.png', alt: 'WorkApp interface preview 3', caption: 'WorkApp — 3 of 4' },
    { src: 'assets/project-1/image-4.png', alt: 'WorkApp interface preview 4', caption: 'WorkApp — 4 of 4' }
  ],
  'project-2': [
    { src: 'assets/project-2/image-1.png', alt: 'Converto interface preview 1', caption: 'Converto — 1 of 4' },
    { src: 'assets/project-2/image-2.png', alt: 'Converto interface preview 2', caption: 'Converto — 2 of 4' },
    { src: 'assets/project-2/image-3.png', alt: 'Converto interface preview 3', caption: 'Converto — 3 of 4' },
    { src: 'assets/project-2/image-4.png', alt: 'Converto interface preview 4', caption: 'Converto — 4 of 4' }
  ],
  'project-3': [
    { src: 'assets/project-3/image-1.png', alt: 'HireTrack interface preview 1', caption: 'HireTrack — 1 of 4' },
    { src: 'assets/project-3/image-2.png', alt: 'HireTrack interface preview 2', caption: 'HireTrack — 2 of 4' },
    { src: 'assets/project-3/image-3.png', alt: 'HireTrack interface preview 3', caption: 'HireTrack — 3 of 4' },
    { src: 'assets/project-3/image-4.png', alt: 'HireTrack interface preview 4', caption: 'HireTrack — 4 of 4' }
  ],
  'project-4': [
    { src: 'assets/project-4/image-1.png', alt: 'Rental Cars interface preview 1', caption: 'Rental Cars — 1 of 4' },
    { src: 'assets/project-4/image-2.png', alt: 'Rental Cars interface preview 2', caption: 'Rental Cars — 2 of 4' },
    { src: 'assets/project-4/image-3.png', alt: 'Rental Cars interface preview 3', caption: 'Rental Cars — 3 of 4' },
    { src: 'assets/project-4/image-4.png', alt: 'Rental Cars interface preview 4', caption: 'Rental Cars — 4 of 4' }
  ],
  'project-5': [
    { src: 'assets/project-5/image-1.png', alt: 'Pintoflix interface preview 1', caption: 'Pintoflix — 1 of 4' },
    { src: 'assets/project-5/image-2.png', alt: 'Pintoflix interface preview 2', caption: 'Pintoflix — 2 of 4' },
    { src: 'assets/project-5/image-3.png', alt: 'Pintoflix interface preview 3', caption: 'Pintoflix — 3 of 4' },
    { src: 'assets/project-5/image-4.png', alt: 'Pintoflix interface preview 4', caption: 'Pintoflix — 4 of 4' }
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
let lastFocusedElement = null;

function updateLightboxImage() {
  if (!lightboxImg || !lightboxCaption || activeGallery.length === 0) return;
  const image = activeGallery[activeIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxCaption.textContent = image.caption;
}

function openLightbox(galleryName, imageIndex) {
  if (!lightbox || !galleryData[galleryName]) return;
  lastFocusedElement = document.activeElement;
  activeGallery = galleryData[galleryName];
  activeIndex = imageIndex;
  updateLightboxImage();
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose?.focus();
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
  lastFocusedElement?.focus?.();
}

function showPreviousImage() {
  if (!activeGallery.length) return;
  activeIndex = activeIndex === 0 ? activeGallery.length - 1 : activeIndex - 1;
  updateLightboxImage();
}

function showNextImage() {
  if (!activeGallery.length) return;
  activeIndex = activeIndex === activeGallery.length - 1 ? 0 : activeIndex + 1;
  updateLightboxImage();
}

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openLightbox(button.dataset.gallery, Number(button.dataset.index));
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', showPreviousImage);
lightboxNext?.addEventListener('click', showNextImage);

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('active')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showPreviousImage();
  if (event.key === 'ArrowRight') showNextImage();
});


// About page typewriter animation.
const typingText = document.getElementById('typingText');

const aboutText = `I’m a frontend developer who genuinely enjoys technology and turning ideas into clean, responsive and easy-to-use digital experiences.

My main focus is React and modern frontend development. I studied Computer Science and also completed a Full Stack Developer Bootcamp, which gave me a wider understanding of how web applications work beyond the interface. Frontend is where I feel strongest, and it’s the area I want to keep growing in.

I enjoy working as part of a team, sharing ideas and solving problems together. At the same time, my freelance work has taught me to take ownership, manage priorities independently and keep moving when a project changes direction.

Before moving deeper into development, I also worked in a leadership role. That experience shaped the way I communicate, organise work and support people — skills I now bring into every development team and project.`;

if (typingText) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typingText.textContent = aboutText;
  } else {
    let typingIndex = 0;
    const typingSpeed = 13;

    function typeAboutText() {
      if (typingIndex < aboutText.length) {
        typingText.textContent += aboutText.charAt(typingIndex);
        typingIndex += 1;
        window.setTimeout(typeAboutText, typingSpeed);
      } else {
        document.querySelector('.about-typing .cursor')?.classList.add('typing-complete');
      }
    }

    window.setTimeout(typeAboutText, 350);
  }
}

// Reliable contact-page email copy action.
const copyEmailButton = document.getElementById('copyEmail');
const copyFeedback = document.getElementById('copyFeedback');

copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
    const label = copyEmailButton.querySelector('span');
    if (label) label.textContent = 'Copied!';
    if (copyFeedback) copyFeedback.textContent = 'Email copied to clipboard.';
    setTimeout(() => {
      if (label) label.textContent = 'Copy email';
      if (copyFeedback) copyFeedback.textContent = '';
    }, 2200);
  } catch {
    if (copyFeedback) copyFeedback.textContent = email;
  }
});
