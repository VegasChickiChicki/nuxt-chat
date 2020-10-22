export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-chat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/styles/main.scss',
  ],

  styleResources: {
    scss: [
      '~assets/styles/vars/*.scss',
    ]
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth',
    'nuxt-socket-io',
  ],

  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },

  io: {
    // module options
    sockets: [{
      name: 'main',
      url: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'http://194.67.87.60:8080',
      default: true,
    }]
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/api' : 'http://194.67.87.60:8080/api'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/auth', method: 'post', propertyName: 'data.token' },
          logout: { url: '/user/logout', method: 'post' },
          user: { url: '/user/user', method: 'get', propertyName: 'data.user' }
        },
        tokenType: false,
        // tokenRequired: true,
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
