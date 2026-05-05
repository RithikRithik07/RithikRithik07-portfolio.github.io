// ==========================================
// TYPING ANIMATION
// ==========================================
const text = ["Java Developer", "Full Stack Enthusiast", "Problem Solver", "Football Player"];
let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function type() {
  if (index >= text.length) index = 0;

  currentText = text[index];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  const typingElement = document.getElementById("typing");
  if (typingElement) {
    typingElement.textContent = currentText.substring(0, charIndex);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

// Start typing when page loads
document.addEventListener('DOMContentLoaded', () => {
  type();
});

// ==========================================
// DARK/LIGHT MODE TOGGLE
// ==========================================
const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeSwitch.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeSwitch.textContent = '☀️';
  }
}

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHT
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// CONTACT FORM HANDLING (using Formspree)
// ==========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // For actual email sending, use Formspree (free)
    // Replace 'YOUR_FORM_ID' with your actual Formspree ID
    const formData = new FormData(contactForm);
    
    try {
      // Simulate form submission (replace with actual Formspree endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (formStatus) {
        formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
        formStatus.style.color = '#4ade80';
      }
      contactForm.reset();
      
      setTimeout(() => {
        if (formStatus) formStatus.textContent = '';
      }, 5000);
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = '❌ Error sending message. Please try again.';
        formStatus.style.color = '#f87171';
      }
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ==========================================
// SMOOTH SCROLLING FOR ALL LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});