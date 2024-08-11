import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'MediateFrystal',
  subtitle: 'Website',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 250,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/pexels-jibarofoto-2471235.jpg',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center', // Equivalent to object-position, defaults center
    credit: {
      enable: true,         // Display the credit text of the banner image
      text: '图片来源',              // Credit text to be displayed
      url: 'https://www.pexels.com/zh-cn/photo/1546251/'                // (Optional) URL link to the original artwork or artist's page
    }
  },
  favicon: [    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.Todo,
    LinkPreset.Log,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/MediateFrystal/sturdy-funicular',     // Internal links should not include the base path, as it is automatically added
      external: true,                               // Show an external link icon and will open in a new tab
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/avatar_reisa@220px.png', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'MediateFrystal',
  bio: '介导鱼苗',
  links: [
    {
      name: 'X',
      icon: 'fa6-brands:x-twitter', // Visit https://icones.js.org/ for icon codes
      // You will need to install the corresponding icon set if it's not already included
      // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://x.com/MediateFrystal/',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/MediateFrystal/',
    },
    {
      name: 'Discord',
      icon: 'fa6-brands:discord',
      url: 'https://discordapp.com/users/809782264312758284',
    },
    {
      name: 'QQ',
      icon: 'fa6-brands:qq',
      url: 'http://wpa.qq.com/msgrd?v=3&uin=3089574798&site=qq&menu=yes',
    },
    {
      name: '哔哩哔哩',
      icon: 'fa6-brands:bilibili',
      url: 'https://space.bilibili.com/172888798',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
