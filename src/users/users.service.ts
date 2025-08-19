import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import type { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    if (!dto.avatarURL || dto.avatarURL.trim().length === 0) {
      throw new BadRequestException('avatarURL is required');
    }
    const existingByUsername = await this.userRepo.findOne({
      where: { username: dto.username },
    });
    if (existingByUsername) {
      throw new ConflictException('Username already exists');
    }
    const existingByEmail = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existingByEmail) {
      throw new ConflictException('Email already exists');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
      avatarURL: dto.avatarURL,
    });
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { userId: id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (dto.email && dto.email !== user.email) {
      const existingByEmail = await this.userRepo.findOne({
        where: { email: dto.email },
      });
      if (existingByEmail) {
        throw new ConflictException('Email already exists');
      }
      user.email = dto.email;
    }
    if (dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }
    if (dto.avatarURL) {
      user.avatarURL = dto.avatarURL;
    }
    return this.userRepo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.softRemove(user);
  }
}
