import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {

  }

  async createUser(body: CreateUserDto) {
    try {

      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: body.email },
            { userName: body.userName }
          ]
        }
      });

      if (existingUser) {
        throw new BadRequestException('El correo o nombre de usuario ya existe');
      }

      // Hashear la contraseña
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

      // Eliminar contraseña de la respuesta
      const { password, ...result } = newUser;
      return result;

    } catch (error) {
      if (error instanceof BadRequestException) throw error; // propaga errores esperados
      console.error(error);
      throw new InternalServerErrorException('Error al crear usuario'); // otros errores
    }
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
      if (user) return user;
      return false;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
