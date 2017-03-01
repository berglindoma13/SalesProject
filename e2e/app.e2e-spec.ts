import { SalesProjectPage } from './app.po';

describe('sales-project App', () => {
  let page: SalesProjectPage;

  beforeEach(() => {
    page = new SalesProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
