import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema()
export class Place {
  @Prop()
  name: string;

  @Prop()
  place: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
