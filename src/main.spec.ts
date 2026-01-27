import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

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
    description: 'test'
}));

describe('Main', () => {
  let mockExit: jest.SpyInstance;

  beforeEach(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);
  });

  afterEach(() => {
    mockExit.mockRestore();
    jest.clearAllMocks();
  });

  it('should bootstrap successfully', async () => {
    jest.isolateModules(() => {
        require('./main');
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(NestFactory.create).toHaveBeenCalled();
  });

  it('should handle error during bootstrap', async () => {
    (NestFactory.create as jest.Mock).mockRejectedValueOnce(new Error('Bootstrap failed'));

    jest.isolateModules(() => {
        require('./main');
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
