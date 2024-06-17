import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { peticionInterceptor } from './admin/interceptors/peticion.interceptor';

export const appConfig: ApplicationConfig = {
  //providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
  providers: [provideRouter(routes), 
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: peticionInterceptor, multi:true},
    provideClientHydration(),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule)]
  //validar si se debe importar provideClientHydration
};
