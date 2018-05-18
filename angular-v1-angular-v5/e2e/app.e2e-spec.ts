import { AppPage } from './app.po';

describe('my-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a title', () => {
    page.navigateTo();
    expect(page.getAppTitle()).toEqual('AngularJS/Angular 5 Hybrid Application');
  });

  it('navigate to view1', () => {
    page.navigateTo();
    page.clickLink('/view1');
    expect(page.getParagraphText()).toEqual('This is the partial for view 1.');
  });

  it('navigate to view2', () => {
    page.navigateTo();
    page.clickLink('/view2');
    expect(page.getParagraphText()).toEqual('This is the partial for view 2.');
  });

  it('navigate to view3', () => {
    page.navigateTo();
    page.clickLink('/view3');
    expect(page.getParagraphText()).toEqual('This is the partial for view 3.');
  });
});
