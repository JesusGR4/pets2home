import { YoufeelmPage } from './app.po';

describe('youfeelm App', function() {
  let page: YoufeelmPage;

  beforeEach(() => {
    page = new YoufeelmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
