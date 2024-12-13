import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cars } from "./cars.entity";
import { Orders } from "./orders.entity";
import { Roles } from "src/roles.enum";

@Entity('users')
export class Users{
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({type:"varchar",length:100})
  name: string
  @Column({type:"varchar",length:100, nullable:false, unique:true})
  email: string
  @Column({type:"varchar",length:255})
  password: string
  @Column({type:"integer",nullable: false})
  identity: number
  @Column({type:"varchar",length:50})
  phone: string
  @Column({type:"varchar",length:100})
  city: string
  @Column({
    type: 'enum',
    enum: Roles
  })
  role: string

  @OneToMany(()=>Cars,(car)=>car.users)
  cars: Cars[]

  @OneToMany(()=>Orders,(order)=>order.users)
  order: Orders[]
}