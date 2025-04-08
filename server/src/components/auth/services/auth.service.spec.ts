import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthUtils } from '../utils/auth.util';
import errorMessage from '../../../common/utils/error.message';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository;
  let mockJwtService;
  let mockAuthUtils;

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
      getOne: jest.fn(),
    };

    mockJwtService = {
      signAsync: jest.fn(),
    };

    mockAuthUtils = {
      generateHash: jest.fn(),
      comparePasswords: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: AuthUtils, useValue: mockAuthUtils },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should register a new user', async () => {
    const userData = {
      email: 'test@test.com',
      password: 'P@ssword123456',
      name: 'test',
    };
    const hashedPassword = 'hashedPassword';

    mockAuthUtils.generateHash.mockReturnValue(hashedPassword);
    mockUserRepository.create.mockReturnValue(userData);
    mockUserRepository.create.mockResolvedValueOnce({ id: 1, ...userData });

    await authService.register(
      userData.email,
      userData.password,
      userData.name,
    );

    expect(mockUserRepository.create).toHaveBeenCalledWith({
      ...userData,
      password: hashedPassword,
    });
    expect(mockUserRepository.create).toHaveBeenCalled();
  });

  it('should return JWT on successful login', async () => {
    const userData = {
      id: 1,
      email: 'test@test.com',
      password: 'hashedPassword',
      role: 'user',
    };
    const token = 'testToken';

    mockUserRepository.getOne.mockResolvedValueOnce(userData);
    mockAuthUtils.comparePasswords.mockResolvedValueOnce(true);
    mockJwtService.signAsync.mockReturnValueOnce(token);

    const result = await authService.login(userData.email, userData.password);

    expect(result).toEqual({ token: `Bearer ${token}` });
    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      id: userData.id,
      role: userData.role,
    });
  });

  it('should throw error on invalid credentials', async () => {
    mockUserRepository.getOne.mockResolvedValueOnce(null);

    await expect(authService.login('ssss@sss.com', 'password')).rejects.toThrow(
      errorMessage.USER_NOT_FOUND,
    );
  });
});
