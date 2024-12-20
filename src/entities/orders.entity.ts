import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";

@Entity('orders')
export class Orders{
  
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  orderDate: Date

  @ManyToOne(()=>Users,(user)=>user.order)
  users: Users

  @OneToOne(()=>OrderDetails,(ordDetails)=>ordDetails.order)
  orderDetails: OrderDetails
}