import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LoginToken } from './type/login-token.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { RegisterDTO } from './dto/register.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: DeepMockProxy<PrismaClient>;

  const testUser = {
    id: 1,
    password: '$2b$10$i5Y87vsW1WYjg./7nqgoneCoLaXmpbcYeMkBF7vYSaOxFdOeYEFRu',
    name: 'also3',
    username: 'also3',
    email: 'also3@gmail.com',
    photo: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [JwtModule, UserModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should be defined', () => {
      expect(authService.register).toBeDefined();
    });

    const registerDTO: RegisterDTO = {
      email: '',
      name: 'also',
      password: 'also',
      photo: 'photo',
      username: 'also',
    };
    it('should create new user', async () => {
      prisma.user.create.mockResolvedValue(testUser);
      const register = await authService.register(registerDTO);
      console.log(register);
    });
  });

  describe('validateUser', () => {
    it('should be defined', () => {
      expect(authService.validateUser).toBeDefined();
    });

    it('it should return null if wrong password', async () => {
      prisma.user.findUnique.mockResolvedValue(testUser);
      const validateUser = await authService.validateUser('also', 'wrong pass');
      expect(validateUser).toBeNull();
    });

    it('it should return user if valid', async () => {
      prisma.user.findUnique.mockResolvedValue(testUser);
      const validateUser = await authService.validateUser('also', '123456');
      const { password, ...mockResult } = testUser;
      expect(validateUser).toEqual(mockResult);
    });
  });

  describe('loginToken', () => {
    it('should be defined', () => {
      expect(authService.loginToken).toBeDefined();
    });

    it('should return jwt token', () => {
      const payload: LoginToken = { sub: 1, username: 'username' };
      const loginToken = authService.loginToken(payload);
      expect(loginToken);
    });
  });
});
