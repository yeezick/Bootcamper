import 'dotenv/config';

export default {
  expo: {
    name: 'native',
    slug: 'native',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/jira-rocket.png', //todo: image will most likely be copyrighted
    splash: {
      image: './assets/conference-photo.png', // the image that pops up on initial app load
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/jira-rocket.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/jira-rocket .png',
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
