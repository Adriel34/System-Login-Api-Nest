import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAllUsers(token: string) {
    const users = await this.prisma.user.findMany();

    const formattedToken = token.replace(/^Bearer\s*/i, '');

    const { email } = this.jwtService.verify(formattedToken);

    const mappedContact = users.map(({ id, name, email: contactEmail }) => {
      if (contactEmail === email) {
        return { id, name, email: contactEmail, logged: true };
      }
      return { id, name, email: contactEmail };
    });

    return mappedContact;
  }

  async updateUser(data: User) {
    const { id, name, email } = data;
  
    const updatedContact = await this.prisma.user.update({
      where: { id },
      data: {
        name: name || undefined,
        email: email || undefined,
      },
    });
  
    return updatedContact;
  }

  async deleteUser(userId: number) {

    await this.prisma.user.delete({ where: { id: userId } });

    return { success: true}
  }
}
