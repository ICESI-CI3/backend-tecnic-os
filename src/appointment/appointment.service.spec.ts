import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { UsersService } from '../users/users.service';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let userService: UsersService;

  const mockAppointmentRepository = {
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => ({dto})),
    find: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id: +id, description: 'Appointment Description', date: '2024-04-21', initTime: '09:00:00'})),
    delete: jest.fn(() => ({ affected: 1 })),
  };

  const mockUsersService = {
    findOneByID: jest.fn((id) => ({ id, name: 'Test User' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: mockAppointmentRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an appointment', async () => {
    const createAppointmentDto = { 
      description: 'desc',
      date: '2000-02-02',
      initTime: '18:50',
      userId: '222222',
    };
    const technicianId = '111111';
  
    const expectedAppointment = {
      id: expect.any(Number),
      description: 'desc',
      date: '2000-02-02',
      initTime: '18:50',
      user: expect.objectContaining({
        id: '222222',
        name: expect.any(String),
      }),
      technician: expect.objectContaining({
        id: '111111',
        name: expect.any(String),
      })
    };
  
    mockUsersService.findOneByID.mockImplementation(id => ({ id, name: id === '222222' ? 'User 222222' : 'Technician 111111' }));
    mockAppointmentRepository.save.mockImplementation(dto => ({ id: 15, ...dto }));
  
    const appointment = await service.create(createAppointmentDto, technicianId);
  
    expect(appointment).toEqual(expectedAppointment);
    expect(mockUsersService.findOneByID).toHaveBeenCalledWith('222222');
    expect(mockUsersService.findOneByID).toHaveBeenCalledWith('111111');
    expect(mockAppointmentRepository.save).toHaveBeenCalled();
  });

  it('should find all appointments', async () => {
    const appointments = await service.findAll();

    // Verifica que todos los objetos en la lista tienen la estructura esperada
    appointments.forEach(appointment => {
        expect(appointment).toEqual({
            id: expect.any(Number),
            description: 'desc',
            date: expect.any(String),
            initTime: expect.any(String),
            user: {
                id: expect.any(String),
                name: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
                role: expect.arrayContaining(['user']),
                rating: expect.any(Number),
                deletedAt: null
            },
            technician: {
                id: expect.any(String),
                name: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
                role: expect.arrayContaining(['technician']),
                rating: expect.any(Number),
                deletedAt: null
            }
        });
    });

    expect(mockAppointmentRepository.find).toHaveBeenCalled();
    });


    it('should find one appointment', async () => {
        const id = 1;  // Asegúrate de que el tipo y valor de 'id' sean correctos según tus datos
        const appointment = await service.findOne(id.toString());
    
        expect(appointment).toEqual({
            id: expect.any(Number),
            description: expect.any(String),
            date: expect.any(String),
            initTime: expect.any(String),
        });
        expect(mockAppointmentRepository.findOne).toHaveBeenCalledWith({ where: { id: id.toString() } });
    });
    
    
    it('should update an appointment', async () => {
        const id = '1';
        const updateAppointmentDto = {
            id: '1',
            description: 'Updated Description',
            date: '2024-04-22',
            initTime: '10:00:00',
        };

        const appointment = await service.update(id, updateAppointmentDto);

        expect(appointment).toEqual({
            id: NaN,
            description: 'Updated Description',
            date: '2024-04-22',
            initTime: '10:00:00',
        });
        expect(mockAppointmentRepository.save).toHaveBeenCalled();
    });
  

  it('should remove an appointment', async () => {
    const id = '12';
    await service.remove(id);

    expect(mockAppointmentRepository.delete).toHaveBeenCalledWith(id);
  });
});
