//  * Base
import { APP_INITIALIZER, NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpLoaderFactory,
  appInitializerFactory,
  MissingTranslationService,
} from './language';
import {
  TranslateLoader,
  TranslateModule,
  MissingTranslationHandler,
  TranslateService,
} from '@ngx-translate/core';

// * Components
import { AppComponent } from './app.component';
import { SvgComponent } from './components/svg/svg.component';
import { NavigationService } from './service/navigation.service';

@NgModule({
  declarations: [AppComponent, SvgComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslationService,
      },
      useDefaultLang: false,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
    // NavigationService, // TODO Доробити)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
