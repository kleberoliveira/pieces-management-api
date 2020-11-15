import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OperatorDocument = Operator & Document;

@Schema()
export class Operator {
  @Prop()
  name: string;

  @Prop()
  operator: string;

  @Prop()
  password: string;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
