const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 6005

const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

app.use(nuxt.render)

if (config.dev) {
  new Builder(nuxt).build()
  .then(() => {
    app.listen(port)
    console.log(port + '포트에서 연결됨. Dev mode')
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
else {
    app.listen(port)
    console.log(port + '포트에서 연결됨')
}