import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";

@Entity('cars')
export class Cars{
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({type:"varchar",length:100})
  brand: string
  @Column({type:"varchar",length:100})
  model: string
  @Column("integer")
  year: number
  @Column("integer")
  pricePerDay: number
  @Column({type:"varchar",length:255})
  image: string
  @Column("text")
  description: string

  @ManyToOne(()=>Users,(user)=>user.cars)
  @JoinColumn()
  users: Users

  @OneToMany(()=>OrderDetails,(ordDetails)=>ordDetails.cars)
  orderDetails: OrderDetails[]
}