import { Test, TestingModule } from '@nestjs/testing';
import { TechniciansService } from './technicians.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('TechniciansService', () => {
  let service: TechniciansService;
  let technicianRepository: Repository<Technician>;
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechniciansService,
        UsersService,
        {
          provide: getRepositoryToken(Technician),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TechniciansService>(TechniciansService);
    technicianRepository = module.get<Repository<Technician>>(
      getRepositoryToken(Technician),
    );
    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a technician', async () => {
      const createUserDto: CreateUserDto = {
        id: '111111',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password456',
        role: ['technician'],
      };
      const createdUser: User = {
        ...createUserDto,
        rating: -1,
        deletedAt: null,
      };
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

      const createTechnicianDto = {
        userId: '111111',
        description: 'Technician Description',
        tags: 'tag1, tag2',
      };

      jest.spyOn(userService, 'findOneByID').mockResolvedValue(createdUser);

      // Crear un técnico simulado para devolver desde el espionaje
      const createdTechnician: Partial<Technician> = {
        id: 1, // Añadimos un id ficticio para satisfacer la propiedad requerida
        ...createTechnicianDto,
        user: createdUser,
      };

      // Simular la creación del técnico
      jest
        .spyOn(technicianRepository, 'save')
        .mockResolvedValue(createdTechnician as Technician);
    });
  });

  describe('findAll', () => {
    it('should return all technicians', async () => {
      const technicians = [
        { id: 1, description: 'Technician 1', tags: 'tag1, tag2' },
        { id: 2, description: 'Technician 2', tags: 'tag3, tag4' },
      ];
      const technicianEntities = technicians.map((tech) =>
        Object.assign(new Technician(), tech),
      ); // Convertir los objetos planos en entidades Technician
      jest
        .spyOn(technicianRepository, 'find')
        .mockResolvedValue(technicianEntities); // Pasar las entidades Technician en lugar de los objetos planos

      const result = await service.findAll();

      expect(result).toEqual(technicians);
    });
  });

  describe('findOneByUserId', () => {
    it('should return a technician by user ID', async () => {
      const userId = '1111111';
      const user = new User();
      user.id = userId;
      jest.spyOn(userService, 'findOneByID').mockResolvedValue(user);
      const technician = {
        id: 1,
        description: 'Test technician',
        tags: 'tag1, tag2',
        user,
      };
      const technicianEntity = Object.assign(new Technician(), technician); // Convertir el objeto plano en una entidad Technician
      jest
        .spyOn(technicianRepository, 'findOne')
        .mockResolvedValue(technicianEntity); // Pasar la entidad Technician en lugar del objeto plano

      const result = await service.findOneByUserId(userId);

      expect(result).toEqual(technician);
    });
  });

  describe('findOneByID', () => {
    it('should return a technician by ID', async () => {
      const technicianId = 1;
      const technician = {
        id: technicianId,
        description: 'Test technician',
        tags: 'tag1, tag2',
      };
      const technicianEntity = Object.assign(new Technician(), technician); // Convertir el objeto plano en una entidad Technician
      jest
        .spyOn(technicianRepository, 'findOne')
        .mockResolvedValue(technicianEntity); // Pasar la entidad Technician en lugar del objeto plano

      const result = await service.findOneByID(technicianId);

      expect(result).toEqual(technician);
    });
  });

  describe('update', () => {
    it('should update a technician', async () => {
      const userId = '111111';
      const updateTechnicianDto = {
        description: 'New description',
        tags: 'newtag1, newtag2',
      };
      const oldTechnician = new Technician(); // Crear una nueva instancia de Technician
      oldTechnician.id = 1;
      oldTechnician.description = 'Old description';
      oldTechnician.tags = 'oldtag1, oldtag2';
      jest.spyOn(service, 'findOneByUserId').mockResolvedValue(oldTechnician); // Simular la devolución de un objeto Technician

      // Simular el guardado del técnico actualizado
      const updatedTechnician = Object.assign(
        oldTechnician,
        updateTechnicianDto,
      );
      jest
        .spyOn(technicianRepository, 'save')
        .mockResolvedValue(updateTechnicianDto as Technician); // Ajustar el valor devuelto por el método save

      const result = await service.update(userId, updateTechnicianDto);

      expect(result).toStrictEqual({
        description: 'New description',
        tags: 'newtag1, newtag2',
      }); // Verifica si el método update devuelve true
      expect(oldTechnician.description).toBe(updateTechnicianDto.description);
      expect(oldTechnician.tags).toBe(updateTechnicianDto.tags);
    });
  });

  describe('remove', () => {
    it('should remove a technician', async () => {
      const technicianId = '1'; // Convertir el ID a una cadena
      jest
        .spyOn(technicianRepository, 'delete')
        .mockResolvedValue({ raw: { affectedRows: 1 } }); // Simular la devolución de un objeto DeleteResult

      const result = await service.remove(technicianId);

      expect(result).toStrictEqual({ raw: { affectedRows: 1 } });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
