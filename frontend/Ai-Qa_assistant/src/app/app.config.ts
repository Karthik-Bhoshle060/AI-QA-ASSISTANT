import { ApplicationConfig, provideZoneChangeDetection, SecurityContext } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
     provideHttpClient(),
    provideMarkdown({
      // This ensures links are handled correctly
      sanitize: SecurityContext.HTML, 
      // clipboardOptions: {},
      markedOptions: {
        provide: 'MarkedOptions',
        
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
        
      },
    
    }),
  ]
};
