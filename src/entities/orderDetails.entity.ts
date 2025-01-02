import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Cars } from "./cars.entity";

@Entity('orderDetails')
export class OrderDetails{
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  startDate: Date
  @Column()
  endDate: Date
  @Column('decimal', { precision: 10, scale: 2 })
  price: number
  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number

  @OneToOne(()=>Orders,(order)=>order.orderDetails)
  @JoinColumn()
  order: Orders

  @ManyToOne(()=>Cars,(cars)=>cars.orderDetails)
  @JoinColumn()
  cars: Cars[]
}