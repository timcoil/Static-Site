document.addEventListener('DOMContentLoaded', () => {
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // In a real application, you would send this data to your server
      // For now, we'll just simulate a successful submission
      console.log('Form submission:', formValues);
      
      // Show success message
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('form-success').classList.remove('hidden');
      
      // Reset form
      contactForm.reset();
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}); 