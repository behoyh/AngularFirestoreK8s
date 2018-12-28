import { AppRouterModule } from './app.router.module';

describe('App.RouterModule', () => {
  let appRouterModule: AppRouterModule;

  beforeEach(() => {
    appRouterModule = new AppRouterModule();
  });

  it('should create an instance', () => {
    expect(appRouterModule).toBeTruthy();
  });
});
