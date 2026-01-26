import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSeriesController } from './workouts-series.controller';
import { WorkoutsSeriesService } from './workouts-series.service';

describe('WorkoutsSeriesController', () => {
  let controller: WorkoutsSeriesController;
  let service: WorkoutsSeriesService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsSeriesController],
      providers: [
        {
          provide: WorkoutsSeriesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<WorkoutsSeriesController>(WorkoutsSeriesController);
    service = module.get<WorkoutsSeriesService>(WorkoutsSeriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    const dto = { workoutId: 1, repetitions: 10 };
    await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne', async () => {
    await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('update', async () => {
    const dto = { repetitions: 12 };
    await controller.update(1, dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('remove', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
