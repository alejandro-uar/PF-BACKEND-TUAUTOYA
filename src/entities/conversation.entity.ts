import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Messages } from "./messages.entity";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    memberOneId: string;

    @ManyToOne(() => Users, (user) => user.conversationsAsMemberOne, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'memberOneId' }) // Enlaza con la columna en la tabla
    memberOne: Users;

    @Column({unique: true})
    memberTwoId: string;

    @ManyToOne(() => Users, (user) => user.conversationsAsMemberTwo, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'memberTwoId' }) // Enlaza con la columna en la tabla
    memberTwo: Users;


    @OneToMany(() => Messages, (message) => message.conversation)
    conversationsAsConversation: Messages[];
}