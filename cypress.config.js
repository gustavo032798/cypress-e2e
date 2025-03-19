const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://notes-serverless-app.com/',
    env: {
      viewportWidthBreakpoint: 768,
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config)
      return config
    },
    defaultCommandTimeout: 20000,
    chromeWebSecurity: false,
    projectId: 'b2rfe7',
  },
})
