import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";

export enum OrderStatus{
  Active = "active",
  Completed = "completed",
  Cancelled = "cancelled",
}

@Entity('orders')
export class Orders{
  
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Active,
  })
  status: OrderStatus;

  @Column({default: 'PENDING'})
  paymentStatus: string;

  @ManyToOne(()=>Users,(user)=>user.order)
  users: Users

  @OneToOne(()=>OrderDetails,(ordDetails)=>ordDetails.order)
  @JoinColumn()
  orderDetails: OrderDetails
}