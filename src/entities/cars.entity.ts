import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Orders } from "./orders.entity";
import { ApprovalStatus, Fuels, Status, Transmissions } from "src/cars/cars.enum";

@Entity('cars')
export class Cars {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "varchar", length: 100 })
  brand: string;

  @Column({ type: "varchar", length: 100 })
  model: string;

  @Column("varchar")
  year: string;

  @Column("integer")
  pricePerDay: number;

  @Column({ type: "varchar", length: 255, default: 'default.png' })
  image: string;

  @Column("text")
  description: string;

  @Column({ type: 'enum', enum: Transmissions })
  transmission: Transmissions;

  @Column({ type: 'enum', enum: Fuels })
  fuelType: Fuels;

  @Column({ type: 'varchar', length: 20 })
  kilometer: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  brakes: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'enum', enum: Status, default: Status.Active })
  status: Status;

  @Column({ type: 'enum', enum: ApprovalStatus, default: ApprovalStatus.Pending })
  approvalStatus: ApprovalStatus;

  @Column({type: 'integer', default: 0})
  discount: number;

  @Column({type: 'boolean', default: false})
  isDiscount: boolean;

  @ManyToOne(() => Users, (user) => user.cars)
  @JoinColumn()
  users: Users;

  @OneToMany(() => Orders, (order) => order.cars)
  orders: Orders[];
}
