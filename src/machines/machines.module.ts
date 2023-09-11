import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Machine} from "./entities/machine.entity";
import {User} from "../users/entities/user.entity";
import {UsersService} from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Machine, User])],
  controllers: [MachinesController],
  providers: [MachinesService, UsersService],
})
export class MachinesModule {}
