import { R6siegeDataVisualizationPage } from './app.po';

describe('r6siege-data-visualization App', () => {
  let page: R6siegeDataVisualizationPage;

  beforeEach(() => {
    page = new R6siegeDataVisualizationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
