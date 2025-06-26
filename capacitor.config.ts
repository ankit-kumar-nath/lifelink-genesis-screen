
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.db9a4ee327584c799a57f50cf29dfa5a',
  appName: 'lifelink-genesis-screen',
  webDir: 'dist',
  server: {
    url: 'https://db9a4ee3-2758-4c79-9a57-f50cf29dfa5a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
