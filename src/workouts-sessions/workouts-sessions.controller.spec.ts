import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsSessionsController } from './workouts-sessions.controller';
import { WorkoutsSessionsService } from './workouts-sessions.service';

describe('WorkoutsSessionsController', () => {
  let controller: WorkoutsSessionsController;
  let service: WorkoutsSessionsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findSummary: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsSessionsController],
      providers: [
        {
          provide: WorkoutsSessionsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<WorkoutsSessionsController>(
      WorkoutsSessionsController,
    );
    service = module.get<WorkoutsSessionsService>(WorkoutsSessionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    const dto = { workoutsGroupId: 1, duration: 60 };
    const req = { user: { uid: 'u1' } };
    await controller.create(dto as any, req);
    expect(service.create).toHaveBeenCalledWith(dto, 'u1');
  });

  it('findAll', async () => {
    await controller.findAll('u1', { year: '2023', month: '1' });
    expect(service.findAll).toHaveBeenCalledWith('u1', 2023, 1);
  });

  it('findSummary', async () => {
    await controller.findSummary('u1');
    expect(service.findSummary).toHaveBeenCalledWith('u1');
  });

  it('findOne', async () => {
    await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('update', async () => {
    const dto = { duration: 120, workoutGroupId: 1, date: new Date() };
    await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('remove', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
