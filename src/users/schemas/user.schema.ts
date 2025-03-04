import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop()
  name?: string;

  @Prop()
  username: string;

  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
