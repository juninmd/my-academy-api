import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsGroupsController } from './workouts-groups.controller';
import { WorkoutsGroupsService } from './workouts-groups.service';

describe('WorkoutsGroupsController', () => {
  let controller: WorkoutsGroupsController;
  let service: WorkoutsGroupsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findAllExercises: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsGroupsController],
      providers: [
        {
          provide: WorkoutsGroupsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<WorkoutsGroupsController>(WorkoutsGroupsController);
    service = module.get<WorkoutsGroupsService>(WorkoutsGroupsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    const dto = { name: 'n', image: 'i', userId: 'u' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findAll', async () => {
    await controller.findAll('u1');
    expect(service.findAll).toHaveBeenCalledWith('u1');
  });

  it('findOne', async () => {
    await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('findOneExercises', async () => {
    await controller.findOneExercises(1);
    expect(service.findAllExercises).toHaveBeenCalledWith(1);
  });

  it('update', async () => {
    const dto = { name: 'n' };
    await controller.update(1, dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('remove', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
