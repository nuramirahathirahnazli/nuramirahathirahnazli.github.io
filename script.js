document.addEventListener('DOMContentLoaded', function() {
  // Update year automatically
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      document.body.classList.toggle('no-scroll');
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (menuToggle) menuToggle.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active') && 
        !e.target.closest('#nav-menu') && 
        !e.target.closest('.menu-toggle')) {
      navMenu.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Add animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all section elements
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Image carousel functionality for awards section
  function initImageCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
      const images = carousel.querySelectorAll('img');
      const dots = carousel.nextElementSibling.querySelectorAll('.dot');
      let currentIndex = 0;
      
      // Show first image initially
      if (images.length > 0) {
        images[0].classList.add('active');
        if (dots.length > 0) {
          dots[0].classList.add('active');
        }
      }
      
      // Set up dot click events
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          // Remove active class from all images and dots
          images.forEach(img => img.classList.remove('active'));
          dots.forEach(d => d.classList.remove('active'));
          
          // Add active class to clicked image and dot
          images[index].classList.add('active');
          dot.classList.add('active');
          currentIndex = index;
        });
      });
      
      // Auto-rotate images every 5 seconds (if multiple images)
      if (images.length > 1) {
        setInterval(() => {
          // Remove active class from current image and dot
          images[currentIndex].classList.remove('active');
          if (dots.length > 0) {
            dots[currentIndex].classList.remove('active');
          }
          
          // Move to next image
          currentIndex = (currentIndex + 1) % images.length;
          
          // Add active class to new image and dot
          images[currentIndex].classList.add('active');
          if (dots.length > 0) {
            dots[currentIndex].classList.add('active');
          }
        }, 5000);
      }
    });
  }

  // Initialize image carousels
  initImageCarousels();
});