import { TimcketsWebPage } from './app.po';

describe('timckets-web App', function() {
  let page: TimcketsWebPage;

  beforeEach(() => {
    page = new TimcketsWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
