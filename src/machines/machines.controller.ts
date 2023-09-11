import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import {AddUserDto} from "./dto/add-user.dto";
import {JwtGuard} from "../auth/guards/jwt.guard";
import { Request } from 'express';
import {RemoveUserDto} from "./dto/remove-user.dto";
import {AddChatDto} from "./dto/add-chat.dto";

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: Request, @Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(req.user, createMachineDto);
  }

  @UseGuards(JwtGuard)
  @Get('my')
  async findMy(@Req() req: Request) {
    return this.machinesService.findByOwner(req.user)
  }

  @UseGuards(JwtGuard)
  @Patch(':id/add_staff')
  async addUser(@Req() req:  Request, @Param('id') id: string, @Body() addUserDto: AddUserDto) {
    return this.machinesService.addUser(+id, req.user, addUserDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/add_staff_chat')
  async addChat(@Req() req:  Request, @Param('id') id: string, @Body() addChatDto: AddChatDto) {
    return this.machinesService.addChat(+id, req.user, addChatDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/remove_staff')
  async removeUser(@Req() req:  Request, @Param('id') id: string, @Body() removeUserDto: RemoveUserDto) {
    return this.machinesService.removeUser(+id, req.user, removeUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.machinesService.findAll();
  }


  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.machinesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.machinesService.remove(+id);
  }
}
