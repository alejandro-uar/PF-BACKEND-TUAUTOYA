import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cars } from "./cars.entity";
import { Orders } from "./orders.entity";
import { Roles } from "src/users/roles.enum";
import { Message } from "firebase-admin/lib/messaging/messaging-api";
import { Messages } from "./messages.entity";
import { Conversation } from "./conversation.entity";
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
  @JoinColumn()
  order: Orders[]

  //Relacion con los mensajes enviados
  @OneToMany(()=>Messages,(message) => message.sender)
  sentMessages: Messages[]


  @OneToMany(() => Conversation, (conversation) => conversation.memberOne)
  conversationsAsMemberOne: Conversation[];

  @OneToMany(() => Conversation, (conversation) => conversation.memberTwo)
  conversationsAsMemberTwo: Conversation[];

  // @OneToMany(() => AccountStatement, (AccountStatement) => AccountStatement.user)
  // accountStatements: AccountStatement[];
}