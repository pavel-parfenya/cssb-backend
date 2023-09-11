import {ForbiddenException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll({ userId: id }) {
    const user = await this.userRepository.findOneBy({ id })
    if(user.admin) return this.userRepository.find();
    throw new ForbiddenException()
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findByTelegramId(telegram_id: number) {
    return this.userRepository.findOne({
      where: { telegram_id }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
