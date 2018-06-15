import { Injector, Provider } from '@angular/core';

export function scopeService(injector: Injector) {
  return injector.get('$rootScope').$new();
}

// allow $scope to be provided to ng1
export const ScopeProvider: Provider = {
  deps: ['$injector'],
  provide: '$scope',
  useFactory: scopeService,
};
