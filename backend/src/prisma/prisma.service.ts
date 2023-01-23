import {
  INestApplication,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async findAndCountAll(prismaObject: any) {
    const { table, where, ...object } = prismaObject;

    const count = await table.aggregate({
      where,
      _count: { id: true },
    });

    if (count._count.id < 1) throw new NotFoundException('Data not found');

    const results = await table.findMany({ ...object, where });

    return {
      count: count._count.id,
      rows: results,
    };
  }
}

const prisma = new PrismaService();
export default prisma;
