import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";
import { Fuels } from "src/cars/cars.enum";

@Entity('cars')
export class Cars{
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({type:"varchar",length:100})
  brand: string

  @Column({type:"varchar",length:100})
  model: string

  @Column("varchar")
  year: string

  @Column("varchar")
  pricePerDay: string

  @Column({type:"varchar",length:255, default: 'default.png'})
  image: string

  @Column("text")
  description: string

  @Column("varchar")
  transmission: string

  @Column({
    type: 'enum',
    enum: Fuels
  })
  fuel: Fuels

  @Column({
    type: 'int'
  })
  kilometers: number

  @ManyToOne(()=>Users,(user)=>user.cars)
  @JoinColumn()
  users: Users

  @OneToMany(()=>OrderDetails,(ordDetails)=>ordDetails.cars)
  orderDetails: OrderDetails[]
}