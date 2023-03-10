import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ErrorHandling {
  constructor(error?: string | object | any) {
    // known errors handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const { code, meta }: Prisma.PrismaClientKnownRequestError = error;

      if (code === 'P2002') {
        const { target }: any = meta;
        const message = target?.join(', ');
        throw new ConflictException(`${message} already in used`);
      }

      if (code === 'P2025') {
        throw new NotFoundException('Data not found');
      }
    }

    // unknown errors handling
    if (error instanceof Prisma.PrismaClientValidationError) {
      const { message }: Prisma.PrismaClientValidationError = error;
      const keyUnknown = 'Unknown arg `';
      if (message.includes(keyUnknown)) {
        const pos = message.indexOf(keyUnknown) + keyUnknown.length;
        let messageInfo = message.substring(pos);
        messageInfo = messageInfo.substring(0, messageInfo.indexOf('`'));
        throw new BadRequestException(`Parameter ${messageInfo} is invalid`);
      }

      // nanti kalau ketemu error unknown lainnya bisa ditambah lagi disini
    }

    if (error instanceof NotFoundException)
      throw new NotFoundException(error.message || 'Data not found');

    throw error;
    // console.log(error);
    // throw new InternalServerErrorException('Terjadi kesalahan');
  }
}
