import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arctic.app',
  appName: 'WitchAndSkeletons',
  webDir: '../dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
