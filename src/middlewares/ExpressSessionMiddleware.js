const expressSession = require('express-session')

const {
  Interfaces: { Middleware },
} = require('@luasenvy/rapidfire')

class ExpressSessionMiddleware extends Middleware {
  constructor() {
    super()

    this.order = 0
    this.expressSession = expressSession({
      secret: 'keyboardcat',
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  }

  async init() {}

  pipe(req, res, next) {
    this.expressSession(req, res, () => {
      console.info(`${this.order} Middleware [ExpressSessionMiddleware].`)
      next()
    })
  }
}

module.exports = ExpressSessionMiddleware
