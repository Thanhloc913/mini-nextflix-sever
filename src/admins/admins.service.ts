import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async create(dto: CreateAdminDto): Promise<Admin> {
    if (!dto.avatarURL || dto.avatarURL.trim().length === 0) {
      throw new BadRequestException('avatarURL is required');
    }
    const existing = await this.adminRepo.findOne({
      where: { username: dto.username },
    });
    if (existing) {
      throw new ConflictException('Username already exists');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const admin = this.adminRepo.create({
      username: dto.username,
      passwordHash,
      avatarURL: dto.avatarURL,
      role: dto.role ?? 'admin',
    });
    return this.adminRepo.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepo.find();
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { adminId: id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: string, dto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);
    if (dto.password) {
      admin.passwordHash = await bcrypt.hash(dto.password, 10);
    }
    if (dto.avatarURL) {
      admin.avatarURL = dto.avatarURL;
    }
    if (dto.role) {
      admin.role = dto.role;
    }
    return this.adminRepo.save(admin);
  }

  async remove(id: string): Promise<void> {
    const admin = await this.findOne(id);
    await this.adminRepo.softRemove(admin);
  }
}
