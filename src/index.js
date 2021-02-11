const path = require('path')

const { RapidFire } = require('@luasenvy/rapidfire')

const rapidFire = new RapidFire({
  host: 'localhost',
  port: 8000,
  paths: {
    middlewares: path.join(__dirname, 'middlewares'),
  },
  // You Can Ordering Use This Property
  //   Default: Follow Order `fs.readdirSync()` In `paths.middlewares` Directory
  // middlewares: ['ExpressSessionMiddleware', 'NuxtMiddleware'],
  // middlewares: ['NuxtMiddleware', 'ExpressSessionMiddleware'],
})

rapidFire.ignition()
