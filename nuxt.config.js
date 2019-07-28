require('dotenv').config();

import axios from 'axios';
import URL from './constants/url';


module.exports = {
  head: {
    title: '샴고양이',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Website for Discord bot Siamese' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  loading: { color: '#3B8070' },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [ { src: './plugins/slide-menu', ssr: false }],
  modules: ['nuxt-oauth'],
  oauth: {
    sessionName: 'discord-session',
    secretKey: process.env.SECRET_KEY,
    oauthHost: process.env.OAUTH_HOST,
    oauthClientID: process.env.OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
    scopes: ['identify'],
    moduleName: 'discord',
    fetchUser: async accessToken => {
      return await axios.get(URL.USER_INFO, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'Siamese Discord bot (para.n-e.kr, 100)',
          'Content-Type': 'application/json',
        }
      }).then(res => res.data)
        .catch(() => undefined);
    }
  },
}

