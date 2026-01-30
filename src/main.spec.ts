import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

jest.mock('@nestjs/core', () => {
  const original = jest.requireActual('@nestjs/core');
  return {
    ...original,
    NestFactory: {
      create: jest.fn().mockResolvedValue({
        useGlobalPipes: jest.fn(),
        enableCors: jest.fn(),
        use: jest.fn(),
        listen: jest.fn(),
      }),
    },
  };
});

jest.mock('@nestjs/common', () => {
  const original = jest.requireActual('@nestjs/common');
  return {
    ...original,
    Logger: jest.fn().mockReturnValue({
      log: jest.fn(),
      error: jest.fn(),
    }),
  };
});

jest.mock('@nestjs/swagger', () => {
  const original = jest.requireActual('@nestjs/swagger');
  return {
    ...original,
    SwaggerModule: {
      createDocument: jest.fn(),
      setup: jest.fn(),
    },
    DocumentBuilder: jest.fn().mockReturnValue({
      setTitle: jest.fn().mockReturnThis(),
      setDescription: jest.fn().mockReturnThis(),
      setVersion: jest.fn().mockReturnThis(),
      addBearerAuth: jest.fn().mockReturnThis(),
      build: jest.fn(),
    }),
  };
});

jest.mock('@scalar/nestjs-api-reference', () => ({
  apiReference: jest.fn(),
}));

jest.mock('../package.json', () => ({
  version: '1.0.0',
  name: 'test',
  description: 'test',
}));

describe('Main', () => {
  let mockExit: jest.SpyInstance;

  beforeEach(() => {
    mockExit = jest
      .spyOn(process, 'exit')
      .mockImplementation((() => {}) as any);
  });

  afterEach(() => {
    mockExit.mockRestore();
    jest.clearAllMocks();
  });

  it('should bootstrap successfully', async () => {
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('./main');
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(NestFactory.create).toHaveBeenCalled();
  });

  it('should handle error during bootstrap', async () => {
    (NestFactory.create as jest.Mock).mockRejectedValueOnce(
      new Error('Bootstrap failed'),
    );

    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('./main');
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should handle error in global catch block', async () => {
    (NestFactory.create as jest.Mock).mockRejectedValueOnce(
      new Error('Bootstrap failed'),
    );

    // Make logger.error throw to trigger outer catch
    const loggerInstance = new Logger();
    (loggerInstance.error as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Logger error');
    });

    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('./main');
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(loggerInstance.error).toHaveBeenCalledTimes(2);
  });
});
