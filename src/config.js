/**
 * Site Configuration
 */
module.exports = {
  // Site details
  site: {
    title: 'My Static Site',
    description: 'A custom-built static site',
    url: 'https://mystaticsite.com',
  },
  
  // ConvertKit integration
  convertkit: {
    form_action: 'https://app.convertkit.com/forms/12345/subscriptions', // Replace with your actual ConvertKit form action URL
    form_id: '12345' // Replace with your actual ConvertKit form ID
  },
  
  // Social media
  social: {
    twitter: 'https://twitter.com/yourusername',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername'
  }
}; 