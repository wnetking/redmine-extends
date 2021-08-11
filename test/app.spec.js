import { App } from '../src/App';

test('Add popup api', () => {
  const app = new App();

  app.addApi('popup', {
    testAction() { }
  });

  expect(app.popupApi.testAction).toBe(Function);
});
