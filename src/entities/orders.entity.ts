import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Cars } from "./cars.entity";


export enum OrderStatus{
  Active = "active",
  Completed = "completed",
  Cancelled = "cancelled",
}

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderDate: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Active })
  status: OrderStatus;

  @Column({ default: 'PENDING' })
  paymentStatus: string;

  // Campos movidos de OrderDetails
  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Users, (user) => user.order)
  users: Users;

  @ManyToOne(() => Cars, (car) => car.orders)
  cars: Cars;
}


