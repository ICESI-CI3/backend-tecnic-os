import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

describe('SeedController', () => {
  let controller: SeedController;
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [
        {
          provide: SeedService,
          useValue: {
            populateDB: jest.fn(() => ("Database populated")),
          },
        },
      ],
    }).overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true }) // Mocking UserRoleGuard
    .compile();

    controller = module.get<SeedController>(SeedController);
    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('runSeed', () => {
    it('should call populateDB method from service', async () => {
      const spyPopulateDB = jest.spyOn(service, 'populateDB');

      await controller.runSeed();

      expect(spyPopulateDB).toHaveBeenCalled();
    });

    it('should return "Database populated" from service', async () => {
      const result = await controller.runSeed();

      expect(result).toEqual("Database populated");
    });
  });
});
