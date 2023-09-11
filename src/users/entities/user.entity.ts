import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AbstractEntity} from "../../database/abstract.entity";

@Entity()
export class User extends AbstractEntity<User>{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  telegram_id: number;

  @Column({ default: false })
  admin: boolean;
}
