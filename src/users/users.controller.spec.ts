import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        id: '1', // Proporciona un valor válido para el ID
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password456',
        role: ['admin'],
      };
      const createdUser: User = {
        // Asegúrate de que coincida con la interfaz User
        id: '1', // Proporciona el mismo valor que en createUserDto
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password456',
        role: ['admin'],
        rating: -1, // Asegúrate de proporcionar todos los campos necesarios
        deletedAt: null,
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      expect(await controller.create(createUserDto)).toBe(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = []; // Puedes proporcionar los usuarios aquí
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      expect(await controller.findAll()).toBe(users);
    });
  });

  describe('findOneByID', () => {
    it('should return a user by ID', async () => {
      const userId = '123456';
      const user: User = {
        id: '123456',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: ['user'],
        rating: 4,
        deletedAt: null,
      };
      jest.spyOn(service, 'findOneByID').mockResolvedValue(user);

      expect(await controller.findOneByID(userId)).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'some-id';
      const updateUserDto: UpdateUserDto = {
        rating: 5,
      };
      const updateResult: UpdateResult = {
        raw: {},
        affected: 1,
        generatedMaps: [],
      }; // Proporciona un resultado de actualización válido aquí
      jest.spyOn(service, 'update').mockResolvedValue(updateResult);

      expect(await controller.update(userId, updateUserDto)).toBe(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 'some-id';
      const deleteResult: DeleteResult = {
        raw: {},
        affected: 1,
      }; // Proporciona un resultado de eliminación válido aquí
      jest.spyOn(service, 'remove').mockResolvedValue(deleteResult);

      expect(await controller.remove(userId)).toBe(deleteResult);
    });
  });
});
