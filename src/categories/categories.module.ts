import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { AuthModule } from '@/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtService],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity
    ]),
    AuthModule,
    UsersModule,
  ]
})
export class CategoriesModule {}
