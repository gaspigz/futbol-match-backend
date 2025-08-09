import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';

@Injectable()
export class PoolService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePoolDto) {
    return this.prisma.pool.create({ data });
  }

  findAll() {
    return this.prisma.pool.findMany({
      include: { users: true },
    });
  }

  async findOne(id: number) {
    const pool = await this.prisma.pool.findUnique({
      where: { id },
      include: { users: true },
    });
    if (!pool) throw new NotFoundException(`Pool with ID ${id} not found`);
    return pool;
  }

  async update(id: number, data: UpdatePoolDto) {
    await this.findOne(id); // asegura que exista
    return this.prisma.pool.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.pool.delete({ where: { id } });
  }
}
