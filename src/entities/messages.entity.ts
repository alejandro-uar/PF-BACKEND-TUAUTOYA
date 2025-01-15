import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Conversation } from "./conversation.entity";

@Entity()
export class Messages{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(()=>Users, (user)=>user.sentMessages, {nullable: false})
    sender: Users; // Usuario que envio el mensaje

    @Column({ type: "text" })
    content: string;  // Contenido del mensaje

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    timestamp: Date;  // Fecha y hora en la que fue enviado el mensaje

    @Column()
    conversationId: string;

    @ManyToOne(() => Conversation, (conversation) => conversation.conversationsAsConversation, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'conversationId' }) // Enlaza con la columna en la tabla
    conversation: Conversation;
}