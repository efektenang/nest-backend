import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AuthDocument = HydratedDocument<Auth>

@Schema()
export class Auth {
    @Prop()
    username: string

    @Prop({unique: true})
    email: string

    @Prop()
    password: string

    @Prop()
    createdAt: Date
}

export const AuthSchema = SchemaFactory.createForClass(Auth)