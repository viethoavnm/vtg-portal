const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()
/**
 * AUTH
 */
routes.add('auth/login', '/login')
routes.add('auth/logout', '/logout')
routes.add('auth/forgot', '/forgot')
routes.add('auth/register', '/register')

/**
 * BLOG
 */
routes.add('blog/list', '/blogs')