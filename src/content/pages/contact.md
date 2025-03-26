---
title: Contact
---

# Contact Us

Feel free to reach out with any questions or comments.

<form id="contact-form" class="contact-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  
  <button type="submit" class="btn">Send Message</button>
</form>

<div id="form-success" class="hidden">
  <p>Thank you! Your message has been sent.</p>
</div>

<div id="form-error" class="hidden">
  <p>Sorry, there was a problem sending your message. Please try again.</p>
</div> 