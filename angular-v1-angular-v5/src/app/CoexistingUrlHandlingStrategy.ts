import { UrlHandlingStrategy, UrlTree } from '@angular/router';

export class CoexistingUrlHandlingStrategy implements UrlHandlingStrategy {

  // Coexists with Angular 1 ngRoute by only handling urls that are true,
  public shouldProcessUrl(url: UrlTree): boolean {
    return url.toString().startsWith('/view3')
      || url.toString() === '/';
  }

  public extract(url: UrlTree): UrlTree {
    return url;
  }

  public merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    return newUrlPart;
  }
}
