import { Injectable, UnauthorizedException } from '@nestjs/common';
import {SignInDto} from "./dto/sign-in.dto";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/entities/user.entity";
import {EntityManager, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {RegisterDto} from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService) {}

  private generateJWT(payload: { sub: number } & Record<string, any>) {
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(registerDto: RegisterDto) {
    const user = new User(registerDto);
    await this.entityManager.save(user);

    const payload = { sub: user.id, telegram_id: user.telegram_id };
    return this.generateJWT(payload);
  }

  async signIn({ telegram_id }: SignInDto) {
    const user = await this.userRepository.findOne({
      where: {telegram_id}
    });
    
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, telegram_id: user.telegram_id };
    return this.generateJWT(payload)
  }
}