'use strict';

import './interpolate-filter';
import './version-directive';

export const myAppVersion = angular.module('myApp.version', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive'
])

.value('version', '0.1');
