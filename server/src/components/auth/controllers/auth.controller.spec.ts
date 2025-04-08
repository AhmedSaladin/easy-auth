import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LoginValidation } from '../validations/login.validation';
import { RegisterValidation } from '../validations/register.validation';
import successMessage from '../../../common/utils/success.message';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should call AuthService login with correct parameters', async () => {
      const loginDto: LoginValidation = {
        email: 'test@example.com',
        password: 'password',
      };
      const result = { token: `Bearer test` };
      jest.spyOn(service, 'login').mockResolvedValue(result);

      expect(await controller.login(loginDto)).toBe(result);
      expect(service.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });
  });

  describe('register', () => {
    it('should call AuthService register with correct parameters', async () => {
      const registerDto: RegisterValidation = {
        email: 'test@example.com',
        password: 'P@ssword12356',
        name: 'test',
      };
      jest.spyOn(service, 'register').mockResolvedValue(undefined);

      expect(await controller.register(registerDto)).toBe(
        successMessage.USER_CREATED,
      );
      expect(service.register).toHaveBeenCalledWith(
        registerDto.email,
        registerDto.password,
        registerDto.name,
      );
    });
  });
});
