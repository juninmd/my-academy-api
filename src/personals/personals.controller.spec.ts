import { Test, TestingModule } from '@nestjs/testing';
import { PersonalsController } from './personals.controller';
import { PersonalsService } from './personals.service';

describe('PersonalsController', () => {
  let controller: PersonalsController;
  let service: PersonalsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findStudents: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalsController],
      providers: [
        {
          provide: PersonalsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PersonalsController>(PersonalsController);
    service = module.get<PersonalsService>(PersonalsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    const dto = { studentUserId: 's', personalUserId: 'p' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findAll', async () => {
    await controller.findAll('p1');
    expect(service.findAll).toHaveBeenCalledWith('p1');
  });

  it('findOne (findStudents)', async () => {
    await controller.findOne('p1');
    expect(service.findStudents).toHaveBeenCalledWith('p1');
  });

  it('update', async () => {
    const dto = { id: 1 };
    await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('remove', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
