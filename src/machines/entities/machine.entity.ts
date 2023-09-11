import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Maintenance} from "../../maintenances/entities/maintenance.entity";

@Entity()
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  staff_chat_id: number;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => User)
  @JoinTable()
  owners: User[]

  @OneToMany(() => Maintenance, (maintenance) => maintenance.machine)
  maintenances: Maintenance[]

  constructor(machine: Partial<Machine>) {
    Object.assign(this, machine);
  }
}
