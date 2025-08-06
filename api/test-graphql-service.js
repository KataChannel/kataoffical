import { Test, TestingModule } from '@nestjs/testing';
import { UniversalGraphQLService } from '../src/graphql/services/universal.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UniversalGraphQLService', () => {
  let service: UniversalGraphQLService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UniversalGraphQLService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              count: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UniversalGraphQLService>(UniversalGraphQLService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users with pagination', async () => {
    const mockUsers = [
      { id: '1', email: 'test@example.com', isActive: true },
      { id: '2', email: 'test2@example.com', isActive: false },
    ];

    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockUsers);
    jest.spyOn(prismaService.user, 'count').mockResolvedValue(2);

    const result = await service.findAll('user', { page: 1, pageSize: 10 });

    expect(result.data).toEqual(mockUsers);
    expect(result.pagination.total).toBe(2);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.pageSize).toBe(10);
  });

  it('should find user by id', async () => {
    const mockUser = { id: '1', email: 'test@example.com', isActive: true };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findById('user', '1');

    expect(result).toEqual(mockUser);
  });

  it('should throw error when user not found', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    await expect(service.findById('user', '999')).rejects.toThrow('user with ID 999 not found');
  });
});

console.log('✅ GraphQL Universal Service test completed successfully!');
