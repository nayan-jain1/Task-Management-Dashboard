import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';


  bootstrapApplication(AppComponent, {
    providers: [provideRouter(appRoutes)],
  }).catch((err) => console.error(err));
