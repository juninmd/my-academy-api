
describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should load config with all env vars and replace newlines in private key', () => {
    process.env.SA_TYPE = 'service_account';
    process.env.SA_PROJECT_ID = 'project-id';
    process.env.SA_PRIVATE_KEY_ID = 'key-id';
    process.env.SA_PRIVATE_KEY = 'begin\\nend';
    process.env.SA_CLIENT_EMAIL = 'email@example.com';
    process.env.SA_CLIENT_ID = 'client-id';
    process.env.SA_AUTH_URI = 'auth-uri';
    process.env.SA_TOKEN_URI = 'token-uri';
    process.env.SA_AUTH_PROVIDER = 'provider';
    process.env.SA_CLIENT_X509 = 'cert-url';
    process.env.AUTH_MOC_ENABLED = 'true';
    process.env.AUTH_MOC_TOKEN = 'token';
    process.env.AUTH_MOC_JSON = '{}';
    process.env.TELEGRAM_TOKEN = 'telegram-token';

    const config = require('./index').default;

    expect(config.serviceAccount).toEqual({
      type: 'service_account',
      projectId: 'project-id',
      privateKeyId: 'key-id',
      privateKey: 'begin\nend',
      clientEmail: 'email@example.com',
      clientId: 'client-id',
      authUri: 'auth-uri',
      tokenUri: 'token-uri',
      authProviderX509CertUrl: 'provider',
      clientX509CertUrl: 'cert-url',
    });
    expect(config.authMoc).toEqual({
      enabled: 'true',
      token: 'token',
      json: '{}',
    });
    expect(config.telegramToken).toBe('telegram-token');
  });

  it('should handle undefined private key', () => {
    delete process.env.SA_PRIVATE_KEY;

    const config = require('./index').default;
    expect(config.serviceAccount.privateKey).toBe('');
  });
});
