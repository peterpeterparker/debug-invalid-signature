import { defineConfig } from '@junobuild/config';

export default defineConfig({
	satellite: {
		ids: {
			development: 'dccg7-xmaaa-aaaaa-qaamq-cai',
			production: 'jbrey-xyaaa-aaaal-ar42q-cai'
		},
		source: 'build',
		predeploy: ['npm run build']
	}
});
