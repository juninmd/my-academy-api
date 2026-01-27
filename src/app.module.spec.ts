import { AppModule } from './app.module';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PreauthMiddleware } from './auth/firebase.auth';

describe('AppModule', () => {
  let appModule: AppModule;
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    appModule = new AppModule();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should apply middleware if FIREBASE_ENABLED is true', () => {
    process.env.FIREBASE_ENABLED = 'true';

    const consumer = {
        apply: jest.fn().mockReturnThis(),
        forRoutes: jest.fn().mockReturnThis(),
    };

    appModule.configure(consumer as unknown as MiddlewareConsumer);

    expect(consumer.apply).toHaveBeenCalledWith(PreauthMiddleware);
    expect(consumer.forRoutes).toHaveBeenCalledWith({
        path: '*',
        method: RequestMethod.ALL,
    });
  });

   it('should NOT apply middleware if FIREBASE_ENABLED is false', () => {
    process.env.FIREBASE_ENABLED = 'false';

    const consumer = {
        apply: jest.fn().mockReturnThis(),
        forRoutes: jest.fn().mockReturnThis(),
    };

    appModule.configure(consumer as unknown as MiddlewareConsumer);

    expect(consumer.apply).not.toHaveBeenCalled();
  });
});
