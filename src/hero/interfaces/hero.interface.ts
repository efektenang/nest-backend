import { Document } from "mongoose"

export interface Hero extends Document {
    readonly name: string;
    readonly position: string
}