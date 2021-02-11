const path = require('path')

const { Nuxt, Builder } = require('nuxt')

const {
  Interfaces: { Middleware },
} = require('@luasenvy/rapidfire')

class NuxtMiddleware extends Middleware {
  constructor() {
    super()

    this.nuxt = null
  }

  async init() {
    this.nuxt = new Nuxt({ telemetry: false, srcDir: path.join(this.$rapidfire.env.paths.root, 'src/nuxt') })

    await this.nuxt.ready()

    // Build only in dev mode
    if (this.$rapidfire.options.isDev) {
      const builder = new Builder(this.nuxt)
      await builder.build()
    }

    this.pipelines.push({ pipe: (...args) => this.pipe(...args) })
  }

  pipe(req, res, next) {
    console.info(`${this.order} Middleware [NuxtMiddleware].`)
    this.nuxt.render(req, res, next)
  }
}

module.exports = NuxtMiddleware
