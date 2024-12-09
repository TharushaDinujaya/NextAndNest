import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStretagy } from './strategies/local.stretagy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, LocalStretagy],
})
export class AuthModule {}
