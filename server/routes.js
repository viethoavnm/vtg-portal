const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()
/**
 * AUTH
 */
routes.add('auth/login', '/login')
routes.add('auth/logout', '/logout')
routes.add('auth/forgot', '/forgot')
routes.add('auth/register', '/register')
routes.add('docs/copyright', '/copyright')
routes.add('docs/about', '/about')
routes.add('docs/policy', '/policy')
routes.add('docs/activity', '/activity')
routes.add('docs/support', '/support')
routes.add('docs/contact', '/contact')
routes.add('docs/career', '/career')
/**
 * BLOG
 */
routes.add('blog/list', '/blogs')