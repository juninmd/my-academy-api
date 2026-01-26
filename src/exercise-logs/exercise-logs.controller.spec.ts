import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseLogsController } from './exercise-logs.controller';
import { ExerciseLogsService } from './exercise-logs.service';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';

describe('ExerciseLogsController', () => {
  let controller: ExerciseLogsController;
  let service: ExerciseLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseLogsController],
      providers: [
        {
          provide: ExerciseLogsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExerciseLogsController>(ExerciseLogsController);
    service = module.get<ExerciseLogsService>(ExerciseLogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an exercise log', async () => {
      const dto: CreateExerciseLogDto = {
        userId: '1',
        exerciseId: 1,
        date: '2023-01-01',
        sets: [],
      };
      const result = {
        id: 1,
        ...dto,
        date: new Date(dto.date),
        createdAt: new Date(),
        updatedAt: new Date(),
        notes: null,
      };
      (service.create as jest.Mock).mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return logs for a user', async () => {
      const result = [];
      (service.findAll as jest.Mock).mockResolvedValue(result);

      expect(await controller.findAll('user1')).toBe(result);
      expect(service.findAll).toHaveBeenCalledWith('user1', undefined);
    });

    it('should filter by exerciseId', async () => {
      const result = [];
      (service.findAll as jest.Mock).mockResolvedValue(result);

      expect(await controller.findAll('user1', '5')).toBe(result);
      expect(service.findAll).toHaveBeenCalledWith('user1', 5);
    });
  });
});
