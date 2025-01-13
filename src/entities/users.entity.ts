import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cars } from "./cars.entity";
import { Orders } from "./orders.entity";
import { Roles } from "src/users/roles.enum";
// import { AccountStatement } from "./accountStatement.entity";

@Entity('users')
export class Users{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({type:"varchar",length:100, nullable: true})
  name: string

  @Column({type:"varchar",length:100, nullable:false, unique:true})
  email: string

  @Column({type:'varchar',length:128, nullable:true,})
  password:string;

  @Column({type:"integer",nullable: true})
  identity: number

  @Column({type:"varchar",nullable: true})
  phone: string

  @Column({type:"varchar",length:100,nullable: true})
  city: string

  @Column('text', { nullable: true })
  address: string

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.CUSTOMER
  })
  role: string

  @Column({ type: 'boolean', default: true })
  isEnabled: boolean;

  @OneToMany(()=>Cars,(car)=>car.users)
  cars: Cars[]

  @OneToMany(()=>Orders,(order)=>order.users)
  order: Orders[]

  // @OneToMany(() => AccountStatement, (AccountStatement) => AccountStatement.user)
  // accountStatements: AccountStatement[];
}