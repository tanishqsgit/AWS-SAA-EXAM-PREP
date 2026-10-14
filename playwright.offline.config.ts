import {defineConfig,devices} from '@playwright/test';
export default defineConfig({testDir:'tests/browser',outputDir:'test-results/offline',testMatch:'offline.spec.ts',workers:1,use:{...devices['Desktop Chrome']},webServer:{command:'npm run preview -- --port 4173 --strictPort',url:'http://127.0.0.1:4173',reuseExistingServer:true},timeout:60000});
