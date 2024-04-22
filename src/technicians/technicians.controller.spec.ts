import { Test, TestingModule } from '@nestjs/testing';
import { TechniciansController } from './technicians.controller';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

describe('TechniciansController', () => {
  let controller: TechniciansController;
  let techniciansService: TechniciansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechniciansController],
      providers: [
        {
          provide: TechniciansService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOneByUserId: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TechniciansController>(TechniciansController);
    techniciansService = module.get<TechniciansService>(TechniciansService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a technician', async () => {
      const createTechnicianDto: CreateTechnicianDto = {
        userId: '1',
        description: 'Test technician',
        tags: 'tag1, tag2',
      };

      await controller.create(createTechnicianDto);

      expect(techniciansService.create).toHaveBeenCalledWith(createTechnicianDto);
    });
  });

  describe('findAll', () => {
    it('should return all technicians', async () => {
      await controller.findAll();

      expect(techniciansService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a technician by userId', async () => {
      const userId = '1';

      await controller.findOne(userId);

      expect(techniciansService.findOneByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
    it('should update a technician', async () => {
      const userId = '1';
      const updateTechnicianDto: UpdateTechnicianDto = {
        description: 'New description',
        tags: 'newtag1, newtag2',
      };

      await controller.update(userId, updateTechnicianDto);

      expect(techniciansService.update).toHaveBeenCalledWith(userId, updateTechnicianDto);
    });
  });

  describe('remove', () => {
    it('should remove a technician by id', async () => {
      const technicianId = '1';

      await controller.remove(technicianId);

      expect(techniciansService.remove).toHaveBeenCalledWith(technicianId);
    });
  });
});