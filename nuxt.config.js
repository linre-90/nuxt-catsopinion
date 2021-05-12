import i18n from './config/i18n'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'catsopinion-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "preconnect", href:"https://fonts.gstatic.com"},
      { rel: "stylesheet", href:"https://fonts.googleapis.com/css2?family=Lato&family=Oswald:wght@700&display=swap"},
      { rel: "stylesheet",  href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css", integrity:"sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==", crossorigin:"anonymous"},
      { rel:"stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"}
    ]
  },
  loading: false
  ,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "./plugins/queryFullCollection.js"},
    {src: "./plugins/formValidateHeader.js"},
    {src: "./plugins/formValidateEmail.js"},
    {src: "./plugins/formTypesDropdownValidation.js"},
    {src: "./plugins/formValidateText.js"},
    {src: "./plugins/findPostsByAge.js"},
    {src: "./plugins/findpostsByQuery.js"},
    {src: "./plugins/findPostById.js"},
    {src: "./plugins/logTypes.js"}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookies' }],
    ['nuxt-i18n', {
      defaultLocale: 'en',
      locales:[
        { code: 'en', name: "English"},
        { code: 'fi', name: "Finnish"}
      ],
      detectBrowserLanguage:{
        useCookie: true,
        cookieKey: "language",
        onlyOnRoot: true
      },
      vueI18n: i18n
    }], 
    ["@nuxtjs/firebase",
    {
      config: {
        apiKey: process.env.NUXT_APP_CATS_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_APP_CATS_FB_AUTH_DOMAIN,
        projectId: process.env.NUXT_APP_CATS_FB_PROJECT_ID,
        storageBucket: process.env.NUXT_APP_CATS_FB_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_APP_CATS_FB_MESSAGE_SENDER_ID,
        appId: process.env.NUXT_APP_CATS_FB_APPID,
      },
      services:{
        auth:true,
        firestore:true,
      }
    }],
    ['@nuxtjs/sitemap', {
      path: '/sitemap.xml',
      hostname: 'https://catsopinion.com',
      generate: false,
      gzip: true,
      defaults: {
        changefreq: 'weekly',
        priority: 1,
        lastmod: new Date()
      },
      routes: [
        /*EN */
        "/88VguDYSWjWPvnCxi6Tg/en/blogreader",
        "/tWQkccBjuY6fOWvQ4mup/en/blogreader",
        "/bVVkUQh0va9re4Q5IczS/en/blogreader",
        "/zCckx8cyadHIMBVnKnKt/en/blogreader",
        "/S0Cs1r1zSmrITXGqrymx/en/blogreader",
        "/kSHJAFntpeza1a4pxAEs/en/blogreader",
        "/Q3pFJ8twnW7fw03iOhkl/en/blogreader",
        "/Z2KA0Bb7PCLQeTJ3EU0I/en/blogreader",
        "/jjOoYHSwb0KVo49Tnvlo/en/blogreader",
        "/wpGTN4tY9GOthlJuf6wU/en/blogreader",
        "/ZrzfwrC0GUhk0EFTbJFu/en/blogreader",
        "/jamVjVGaYNhgFUMNuRwE/en/blogreader",
        /*FI */
        "/fi/5LeiwDXK8907D5uk1vhx/fi/blogreader",
        "/fi/g8rSoAohs1yPJRz7Pa25/fi/blogreader",
        "/fi/TmQzxFV0lFNk9CMesOko/fi/blogreader",
        "/fi/5E8q36n4HGPtiegoX3vi/fi/blogreader",
        "/fi/Sjy3kuwUlfbVXJVDlRq9/fi/blogreader",
        "/fi/4AV3LEjycyruU1U11b4z/fi/blogreader",
        "/fi/sAYQdD47d8pXZu7Pzuas/fi/blogreader",
        "/fi/3BpLCRz0BsxDc7iVbUGW/fi/blogreader",
        "/fi/2GkIUneDfOvmL7wdHDnt/fi/blogreader",
        "/fi/YQdLknRY696s8vMxCei4/fi/blogreader",
        "/fi/yigFvNFCf1Fd6qfGFKew/fi/blogreader",
        "/fi/qWnNOzHcGPoS0Rh3OJBr/fi/blogreader"
      ]
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    '/log': process.env.MY_URL,
    '/submitvalidate': process.env.MY_URL
  },

  publicRuntimeConfig:{
    newsFi: process.env.NEWS_FI,
    newsEn: process.env.NEWS_EN,
    series_env: process.env.SERIES,
    messageCollection: process.env.MESSAGE_COLLECTION,
    blogEn: process.env.EN_BLOGPOSTS,
    blogFi: process.env.FI_BLOGPOSTS,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router:{
    middleware: ["initCookies"]
  },
  serverMiddleware:[
    {path: "/log", handler: "~server-middleware/logger.js"},
    {path: "/submitvalidate", handler: "~server-middleware/submitForm.js"}
  ]
}
