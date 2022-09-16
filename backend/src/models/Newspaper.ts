import { model, Schema, Types, Document } from "mongoose";

export interface NewspaperInterface extends Document {
  id: string;
  title: string;
  image: string;
  link: string;
  abstract: string;
  publisher: Types.ObjectId;
  languages: Array<string>;
  creation_date: Date;
}

const NewspaperSchema = new Schema<NewspaperInterface>(
  {
    id: String,
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true, validate: {
      validator: (v:string) => {
        const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return urlRegex.test(v);
      },
      message: "Link must be a valid URL"
    }},
    abstract: { type: String, required: true },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher",
      required: true,
    },
    languages: {
      type: [String],
      validate: {
        validator: (v: Array<string>) => v.length > 0,
        message: `Languages cannot be empty`,
      },
    },
  },
  {
    timestamps: {
      createdAt: "creation_date",
      updatedAt: false
    },
  }
);

NewspaperSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export const Newspaper = model<NewspaperInterface>(
  "Newspaper",
  NewspaperSchema
);
