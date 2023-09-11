import {ForbiddenException, Injectable} from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import {Machine} from "./entities/machine.entity";
import {EntityManager, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {AddUserDto} from "./dto/add-user.dto";
import {User} from "../users/entities/user.entity";
import {UsersService} from "../users/users.service";
import {RemoveUserDto} from "./dto/remove-user.dto";
import {AddChatDto} from "./dto/add-chat.dto";

@Injectable()
export class MachinesService {

  constructor(
    @InjectRepository(Machine)
    private readonly machinesRepository: Repository<Machine>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly userService: UsersService,
  ) {}

  async create(getUserDto: any, createMachineDto: CreateMachineDto) {
    const user = await this.userService.findOne(getUserDto.userId);
    const machine = new Machine({
      ...createMachineDto,
      owners: [user],
      users: [user]
    });
    await this.entityManager.save(machine);
  }

  async findAll() {
    return this.machinesRepository.find();
  }

  async findOne(id: number) {
    return this.machinesRepository.findOne({
      relations: { owners: true },
      where: { id },
    })
  }

  async findByOwner({ userId }: any) {
    return await this.machinesRepository.findOne({
      select: {
        id: true,
        name: true
      },
      relations: { owners: true, users: true },
      where: { owners: { id: userId } },
    })
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    const machine = await this.machinesRepository.findOneBy({ id })
    machine.name = updateMachineDto.name
    await this.entityManager.save(machine)
  }

  async addUser(id: number, { userId: ownerId }: any, { telegram_id }: AddUserDto) {
    const user = await this.userService.findByTelegramId(telegram_id);
    const machine = await this.machinesRepository.findOne({
      where: { id },
      relations: { owners: true, users: true }
    })

    if(machine.owners?.some(({ id }) => id === ownerId)) {
      if(!machine.users.some(({ id }) => id === user.id)) {
        machine.users.push(new User(user))
        await this.entityManager.save(machine)
      }
      return machine;
    } else {
      throw new ForbiddenException()
    }
  }

  async addChat(id: number, { userId: ownerId }: any, { chat_id }: AddChatDto) {
    const machine = await this.machinesRepository.findOne({
      where: { id },
      relations: { owners: true, users: true }
    })

    if(machine.owners?.some(({ id }) => id === ownerId)) {
      machine.staff_chat_id = chat_id;
      await this.entityManager.save(machine)
      return machine;
    } else {
      throw new ForbiddenException()
    }
  }

  async removeUser(id: number, { userId: ownerId }: any, { telegram_id }: RemoveUserDto) {
    const machine = await this.machinesRepository.findOne({
      where: { id },
      relations: { owners: true, users: true }
    })

    if(machine.owners?.some(({ id }) => id === ownerId)) {
      const updatedMachine = new Machine({
        ...machine,
        users: machine.users.filter(({ telegram_id: id }) => id !== telegram_id)
      })

      await this.entityManager.save(updatedMachine)
      return updatedMachine;
    } else {
      throw new ForbiddenException()
    }
  }

  async remove(id: number) {
    return this.machinesRepository.delete(id)
  }
}
