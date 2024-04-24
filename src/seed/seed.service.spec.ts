import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { UsersService } from 'src/users/users.service';
import { TechniciansService } from 'src/technicians/technicians.service';
import { AppointmentService } from 'src/appointment/appointment.service';

describe('SeedService', () => {
  let service: SeedService;
  let usersService: UsersService;
  let techniciansService: TechniciansService;
  let appointmentService: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: UsersService,
          useValue: {
            fillUsersWithSeedData: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: TechniciansService,
          useValue: {
            fillTechniciansWithSeedData: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: AppointmentService,
          useValue: {
            fillAppointmentsWithSeedData: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
    usersService = module.get<UsersService>(UsersService);
    techniciansService = module.get<TechniciansService>(TechniciansService);
    appointmentService = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('populateDB', () => {
    it('should call fillUsersWithSeedData, fillTechniciansWithSeedData, and fillAppointmentsWithSeedData methods from respective services', async () => {
      await service.populateDB();

      expect(usersService.fillUsersWithSeedData).toHaveBeenCalled();
      expect(techniciansService.fillTechniciansWithSeedData).toHaveBeenCalled();
      expect(appointmentService.fillAppointmentsWithSeedData).toHaveBeenCalled();
    });

    it('should return "Database populated"', async () => {
      const result = await service.populateDB();

      expect(result).toEqual('Database populated');
    });
  });
});
