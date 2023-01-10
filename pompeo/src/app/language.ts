import {
  MissingTranslationHandlerParams,
  MissingTranslationHandler,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from 'src/app/types/language.types';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    environment.domain + environment.translate.prefix,
    environment.translate.suffix
  );
}

export class MissingTranslationService implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
  }
}

export function appInitializerFactory(
  translate: TranslateService,
  injector: Injector
) {
  return () => {
    return new Promise((resolve) => {
      const locationInitialized = injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null)
      );
      locationInitialized.then(() => {
        const langToSet: Language = environment.translate.defaultLocale;
        translate.setDefaultLang(environment.translate.defaultLocale);
        translate.use(langToSet).subscribe({
          next: () => {
            // eslint-disable-next-line no-console
            console.info(`Успішно встановлено мову: '${langToSet}'`);
          },
          error: () => {
            throw new Error(`Проблеми з встановленям мови: '${langToSet}`);
          },
          complete: () => {
            resolve(null);
          },
        });
      });
    });
  };
}
