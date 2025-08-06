import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DateHelpers } from '../shared/utils/date-helpers';

export function initializeDateHelpers(): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      // Initialize DateHelpers to suppress moment warnings
      DateHelpers.init();
      console.log('DateHelpers initialized - moment deprecation warnings suppressed');
      resolve();
    });
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeDateHelpers,
      multi: true
    }
  ]
})
export class DateHelpersModule {}
