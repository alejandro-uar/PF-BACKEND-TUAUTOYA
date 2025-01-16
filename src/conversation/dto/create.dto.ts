import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateConversationDto {
    @ApiProperty({
        description: "UUID del primer miembro de la conversación",
        example: "550e8400-e29b-41d4-a716-446655440000",
      })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    memberOneId: string;

    @ApiProperty({
        description: "UUID del segundo miembro de la conversación",
        example: "550e8400-e29b-41d4-a716-446655440001",
    })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    memberTwoId: string;
}