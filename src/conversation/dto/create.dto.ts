import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateConversationDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    memberOneId: string;

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    memberTwoId: string;
}