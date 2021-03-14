import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Operator } from 'src/operators/schemas/operator.schema';
import { Place } from 'src/places/schemas/place.schema';
import { Product } from 'src/products/schemas/products.schema';

export type HistoryDocument = History & Document;

@Schema({ versionKey: false })
export class History {
  @Prop()
  createAt: Date;

  @Prop()
  history: string;

  @Prop({ type: Types.ObjectId, ref: Place })
  place: Place;

  @Prop({ type: Types.ObjectId, ref: Operator })
  operator: Operator;

  @Prop({ type: Types.ObjectId, ref: Product })
  product: Product|string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
