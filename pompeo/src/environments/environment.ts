// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Language } from 'src/app/types/language.types';

export const environment = {
  production: false,
  api: 'http://localhost:3000/api',
  domain: 'http://localhost:4200/',
  translate: {
    prefix: './assets/locale/',
    suffix: '.json',
    locales: (Language.UA, Language.EN),
    defaultLocale: Language.EN,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
