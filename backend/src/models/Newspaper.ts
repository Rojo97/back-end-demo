import { model, Schema, PaginateModel} from "mongoose";
import idValidator from "mongoose-id-validator";
import paginate from 'mongoose-paginate-v2';

export interface NewspaperInterface {
  _id: number;
  title: string;
  image: string;
  link: string;
  abstract: string;
  publisher: number;
  languages: Array<string>;
  creation_date?: Date;
}

const NewspaperSchema = new Schema<NewspaperInterface>(
  {
    _id: { type: Number, alias: "id" },
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
      type: Number,
      ref: "Publisher",
      required: true
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

NewspaperSchema.plugin(idValidator, {message: "Publisher not found"});
NewspaperSchema.plugin(paginate);

export const Newspaper = model<NewspaperInterface, PaginateModel<NewspaperInterface>>(
  "Newspaper",
  NewspaperSchema
);
