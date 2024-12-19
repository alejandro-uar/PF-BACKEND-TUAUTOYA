import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";
import { Fuels, Transmissions } from "src/cars/cars.enum";

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

  @Column({
    type: 'enum',
    enum: Transmissions
  })
  transmission: Transmissions

  @Column({
    type: 'enum',
    enum: Fuels
  })
  fuelType: Fuels

  @Column({
    type: 'varchar',
    length: 20
  })
  mileage: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true
  })
  brakes: string;

  @Column({
    type: 'enum',
    enum: ['Yes', 'No'],
    default: 'No'
  })
  insurance: string;

  @Column({
    type: 'float',
    default: 0
  })
  rating: number;

  @Column({
    type: 'varchar',
    length: 50
  })
  status: string;

  @ManyToOne(()=>Users,(user)=>user.cars)
  @JoinColumn()
  users: Users

  @OneToMany(()=>OrderDetails,(ordDetails)=>ordDetails.cars)
  orderDetails: OrderDetails[]
}