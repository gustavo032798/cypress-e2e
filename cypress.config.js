const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://notes-serverless-app.com/',
    env: {
      viewportWidthBreakpoint: 768,
    },
    defaultCommandTimeout: 20000,
    chromeWebSecurity: false,
    projectId: 'b2rfe7',
  },
})
