import { Web2Page } from './app.po';

describe('web2 App', function() {
  let page: Web2Page;

  beforeEach(() => {
    page = new Web2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
