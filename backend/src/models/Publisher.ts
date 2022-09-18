import { model, Schema, Document, Types } from "mongoose";

export interface PublisherInterface {
  _id: number;
  name: string;
}

export const PublisherSchema = new Schema<PublisherInterface>(
  {
    _id: { type: Number, alias: "id" },
    name: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "joined_date",
      updatedAt: false,
    },
  }
);

PublisherSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Publisher = model<PublisherInterface>(
  "Publisher",
  PublisherSchema
);
