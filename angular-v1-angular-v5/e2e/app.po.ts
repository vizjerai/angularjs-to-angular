import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  clickLink(href) {
    return element(by.css(`app-root [href="${href}"]`)).click();
  }

  getAppTitle() {
    return element(by.css('app-root h1')).getText();
  }

  getParagraphText() {
    return element(by.css('app-root p:first-of-type')).getText();
  }
}
