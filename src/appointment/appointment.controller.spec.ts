import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { Appointment } from './entities/appointment.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        {
            provide: AppointmentService,
            useValue: {
            create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
            update: jest.fn((dto) => ({dto})),
            findAll: jest.fn(() => []),
            findOne: jest.fn((id) => ({ id: +id, description: 'Appointment Description', date: '2024-04-21', initTime: '09:00:00'})),
            remove: jest.fn(() => ({ affected: 1 })),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Mocking UserRoleGuard
      .compile();

    controller = module.get<AppointmentController>(AppointmentController);
    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an appointment', async () => {
      const createAppointmentDto: CreateAppointmentDto = {
        description: 'Test Description',
        date: '2024-04-23',
        initTime: '09:00:00',
        userId: 'user_id',
      };

      const request = { user: { id: 'technician_id' } };

      await controller.create(createAppointmentDto, request);

      expect(service.create).toHaveBeenCalledWith(createAppointmentDto, 'technician_id');
    });
  });

describe('findAll', () => {
    it('should return an array of appointments', async () => {
        const appointments: Appointment[] = [
            { id: '1', description: 'Appointment 1', date: '', initTime: '', technician: null, user: null },
            { id: '2', description: 'Appointment 2', date: '', initTime: '', technician: null, user: null }
        ];
        jest.spyOn(service, 'findAll').mockResolvedValue(appointments);

        const result = await controller.findAll();

        result.forEach(appointment => {
            expect(appointment).toEqual({
                id: expect.any(String),
                description: expect.any(String),
                date: expect.any(String),
                initTime: expect.any(String),
                user: null,
                technician: null
            });
        });
    });
});

  describe('findOne', () => {
    it('should return the specified appointment', async () => {
      const appointment = { id: '1', description: 'Appointment 1', date: '', initTime: '', technician: null, user: null };
      jest.spyOn(service, 'findOne').mockResolvedValue(appointment);

      const result = await controller.findOne('1');

      expect(result).toEqual(appointment);
    });
  });

  describe('update', () => {
    it('should update the specified appointment', async () => {
      const updateAppointmentDto: UpdateAppointmentDto = {
        description: 'Updated Description',
        date: '2024-04-24',
        initTime: '10:00:00'
      };

      const updatedAppointment = { id: '1', description: 'Updated Description', date: '2024-04-24', initTime: '10:00:00', technician: null, user: null };
      jest.spyOn(service, 'update').mockResolvedValue(updatedAppointment);

      const result = await controller.update('1', updateAppointmentDto);

      expect(result).toEqual(updatedAppointment);
    });
  });

  describe('remove', () => {
    it('should remove the specified appointment', async () => {
      const id = '1';

      await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
