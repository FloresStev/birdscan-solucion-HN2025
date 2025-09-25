import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateGoogleUserDto } from './dto/create-google-user.dt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {

  }

  async createUser(body: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { userName: body.userName }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('El correo o nombre de usuario ya existe');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(body.password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        userName: body.userName,
        password: hash,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        cellphone_number: body.cellphone_number,
        role: body.role ?? 'USER',
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async createGoogleUser(dto: CreateGoogleUserDto) {
    const user = await this.prisma.user.create({
      data: {
        userName: dto.userName,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        role: dto.role,
        cellphone_number: dto.cellphone_number ?? '',
        password: null,
      },
    });
    return user;
  }


  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        password: true,
      },
    });
  }


  async findOne(email: string) {
    try {
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (user) return user ?? undefined;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id } })
      if (!user) throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw new InternalServerErrorException(error.message);
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
