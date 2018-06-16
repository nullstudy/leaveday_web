module.exports = {
  head: {
    title: 'leaveday_frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: "stylesheet", href:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'}
    ],
    script: [
    
    ]
  },
  env: {
    // BACKEND_URL: 'https://www.leaveday.cf'
    BACKEND_URL: 'http://localhost:3001'
  },
  plugins: [
    { src: '~plugins/bootstrap-vue' },
    { src: '~plugins/vue-material'},
    { src: '~plugins/vuejs-datepicker'},
    { src: '~plugins/axios',ssr: false },
    { src: '~plugins/fullcalendar' ,ssr: false }
  ],  
  loading: { color: '#3B8070' },
  router: {
    middleware: ['check-auth']
  },
  build: {
    modules: ['bootstrap-vue/nuxt', ['bootstrap-vue/nuxt', { css: false }]],
    vendor : ['bootstrap-vue','vue-fullcalendar','axios']
  }
}
