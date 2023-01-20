// src/prisma/prisma.service.ts

import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
    // this.$use(SoftDeleteMiddleware);
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

    const results = await table.findMany({ ...object, where });

    return {
      count: count._count.id,
      rows: results,
    };
  }
}
