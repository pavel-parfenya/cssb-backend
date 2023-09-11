import {Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AbstractEntity} from "../../database/abstract.entity";
import {Machine} from "../../machines/entities/machine.entity";

export class Maintenance extends AbstractEntity<Maintenance>{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  milk_ejected: number;

  @Column()
  milk_added: number;

  @Column()
  milk_left: number;

  @ManyToOne(() => Machine, (machine) => machine.maintenances)
  machine: Machine;
}
