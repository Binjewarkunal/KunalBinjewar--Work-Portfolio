document.addEventListener('DOMContentLoaded', function() {
                 // Dark Mode Toggle
                 const darkModeToggle = document.querySelector('.dark-mode-toggle');
                 const body = document.body;
                 
                 // Check for saved theme preference
                 const currentTheme = localStorage.getItem('theme');
                 if (currentTheme === 'dark') {
                     body.setAttribute('data-theme', 'dark');
                     darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                 }
                 
                 darkModeToggle.addEventListener('click', () => {
                     if (body.getAttribute('data-theme') === 'dark') {
                         body.removeAttribute('data-theme');
                         darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                         localStorage.setItem('theme', 'light');
                     } else {
                         body.setAttribute('data-theme', 'dark');
                         darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                         localStorage.setItem('theme', 'dark');
                     }
                 });
                 
                 // Mobile Navigation
                 const hamburger = document.querySelector('.hamburger');
                 const navLinks = document.querySelector('.nav-links');
                 
                 hamburger.addEventListener('click', () => {
                     hamburger.classList.toggle('active');
                     navLinks.classList.toggle('active');
                 });
                 
                 // Close mobile menu when clicking a link
                 document.querySelectorAll('.nav-links a').forEach(link => {
                     link.addEventListener('click', () => {
                         hamburger.classList.remove('active');
                         navLinks.classList.remove('active');
                     });
                 });
                 
                 // Sticky Navigation on Scroll
                 const navbar = document.querySelector('.navbar');
                 window.addEventListener('scroll', () => {
                     if (window.scrollY > 50) {
                         navbar.classList.add('scrolled');
                     } else {
                         navbar.classList.remove('scrolled');
                     }
                 });
                 
                 // Testimonial Carousel
                 const testimonialSlides = document.querySelectorAll('.testimonial-slide');
                 const dots = document.querySelectorAll('.dot');
                 const prevBtn = document.querySelector('.carousel-prev');
                 const nextBtn = document.querySelector('.carousel-next');
                 let currentSlide = 0;
                 
                 function showSlide(index) {
                     testimonialSlides.forEach(slide => slide.classList.remove('active'));
                     dots.forEach(dot => dot.classList.remove('active'));
                     
                     testimonialSlides[index].classList.add('active');
                     dots[index].classList.add('active');
                     currentSlide = index;
                 }
                 
                 function nextSlide() {
                     currentSlide = (currentSlide + 1) % testimonialSlides.length;
                     showSlide(currentSlide);
                 }
                 
                 function prevSlide() {
                     currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
                     showSlide(currentSlide);
                 }
                 
                 nextBtn.addEventListener('click', nextSlide);
                 prevBtn.addEventListener('click', prevSlide);
                 
                 // Dot navigation
                 dots.forEach((dot, index) => {
                     dot.addEventListener('click', () => {
                         showSlide(index);
                     });
                 });
                 
                 // Auto-rotate testimonials
                 let slideInterval = setInterval(nextSlide, 5000);
                 
                 // Pause on hover
                 const carousel = document.querySelector('.testimonial-carousel');
                 carousel.addEventListener('mouseenter', () => {
                     clearInterval(slideInterval);
                 });
                 
                 carousel.addEventListener('mouseleave', () => {
                     slideInterval = setInterval(nextSlide, 5000);
                 });
                 
                 // Form Submission
                 const contactForm = document.getElementById('contactForm');
                 const formMessage = document.getElementById('form-message');
                 
                 contactForm.addEventListener('submit', function(e) {
                     e.preventDefault();
                     
                     const formData = new FormData(this);
                     const name = formData.get('name');
                     const email = formData.get('email');
                     const message = formData.get('message');
                     
                     // Simple validation
                     if (!name || !email || !message) {
                         showFormMessage('Please fill in all fields', 'error');
                         return;
                     }
                     
                     if (!validateEmail(email)) {
                         showFormMessage('Please enter a valid email address', 'error');
                         return;
                     }
                     
                     // Simulate form submission
                     showFormMessage('Your message has been sent successfully!', 'success');
                     contactForm.reset();
                     
                     // In a real implementation, you would send the data to a server here
                     // fetch('your-server-endpoint', {
                     //     method: 'POST',
                     //     body: formData
                     // })
                     // .then(response => response.json())
                     // .then(data => {
                     //     showFormMessage('Your message has been sent successfully!', 'success');
                     //     contactForm.reset();
                     // })
                     // .catch(error => {
                     //     showFormMessage('There was an error sending your message. Please try again.', 'error');
                     // });
                 });
                 
                 function showFormMessage(text, type) {
                     formMessage.textContent = text;
                     formMessage.className = type;
                     formMessage.style.display = 'block';
                     
                     setTimeout(() => {
                         formMessage.style.display = 'none';
                     }, 5000);
                 }
                 
                 function validateEmail(email) {
                     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                     return re.test(email);
                 }
                 
                 // Animate elements on scroll
                 const animateOnScroll = () => {
                     const elements = document.querySelectorAll('.fade-in');
                     
                     elements.forEach(element => {
                         const elementPosition = element.getBoundingClientRect().top;
                         const screenPosition = window.innerHeight / 1.2;
                         
                         if (elementPosition < screenPosition) {
                             element.style.animation = 'fadeInUp 1s ease forwards';
                         }
                     });
                 };
                 
                 window.addEventListener('scroll', animateOnScroll);
                 animateOnScroll(); // Run once on load
                 
                 // Update copyright year
                 document.getElementById('year').textContent = new Date().getFullYear();
                 
                 // Initialize skill animations
                 const skillBars = document.querySelectorAll('.skill-progress');
                 const circleFills = document.querySelectorAll('.circle-fill');
                 
                 function animateSkills() {
                     skillBars.forEach(bar => {
                         const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                         bar.style.width = width;
                     });
                     
                     circleFills.forEach(circle => {
                         const percentage = circle.nextElementSibling.textContent;
                         circle.style.strokeDasharray = `${percentage}, 100`;
                     });
                 }
                 
                 // Use Intersection Observer to animate skills when section is in view
                 const skillsSection = document.querySelector('.skills');
                 const observer = new IntersectionObserver((entries) => {
                     entries.forEach(entry => {
                         if (entry.isIntersecting) {
                             animateSkills();
                             observer.unobserve(entry.target);
                         }
                     });
                 }, { threshold: 0.5 });
                 
                 observer.observe(skillsSection);
             });