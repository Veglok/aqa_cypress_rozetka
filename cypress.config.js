const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://rozetka.com.ua/ua/',
    viewportWidth: 1280,
    viewportHeight: 960,
    setupNodeEvents(on, config) {
    },
  },
  env: {
    notebooksPageUrl: 'https://rozetka.com.ua/ua/notebooks/c80004/',
    producer: 'Acer',
    processor: 'Intel Core i7',
    minPrice: '14000',
    maxPrice: '21000',
  }
});
