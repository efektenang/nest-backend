import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HeroDocument = HydratedDocument<Hero>;

@Schema()
export class Hero {
  @Prop()
  name: string;

  @Prop()
  position: string;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
