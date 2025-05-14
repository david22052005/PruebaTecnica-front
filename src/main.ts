import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    // Habilita HttpClient con soporte para fetch (útil en entornos sin XMLHttpRequest)
    provideHttpClient(withFetch()),
  ],
}).catch((err) => console.error(err));