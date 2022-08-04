import { Schema, model } from 'mongoose';

export interface IUser {
  _id?: string;
  nombre: string;
  email: string;
  password: string;
  token?: string;
}

const userSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: true,
      minLength: [4, 'Name should be minimum of 4 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Password should be minimum of 8 characters'],
    },
    token: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

export const User = model<IUser>('users', userSchema);
