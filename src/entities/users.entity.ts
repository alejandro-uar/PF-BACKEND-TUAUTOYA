import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cars } from "./cars.entity";
import { Orders } from "./orders.entity";
import { Roles } from "src/users/roles.enum";

@Entity('users')
export class Users{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  firebaseUid:string

  @Column({type:"varchar",length:100, nullable: true})
  name: string

  @Column({type:"varchar",length:100, nullable:false, unique:true})
  email: string

  @Column({type:"integer",nullable: true})
  identity: number

  @Column({type:"integer",nullable: true})
  phone: number

  @Column({type:"varchar",length:100,nullable: true})
  city: string

  @Column({
    type: 'enum',
    enum: Roles,
    nullable: true
  })
  role: string

  @OneToMany(()=>Cars,(car)=>car.users)
  cars: Cars[]

  @OneToMany(()=>Orders,(order)=>order.users)
  order: Orders[]
}