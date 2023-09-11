import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MachinesModule } from './machines/machines.module';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import {UsersModule} from "./users/users.module";
import { MaintenancesModule } from './maintenances/maintenances.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MachinesModule,
    UsersModule,
    AuthModule,
    MaintenancesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
