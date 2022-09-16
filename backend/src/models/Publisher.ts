import { model, Schema, Document } from "mongoose";

export interface PublisherInterface extends Document {
  id: string;
  name: string;
  joined_date: Date;
}

const PublisherSchema = new Schema<PublisherInterface>(
  {
    id: String,
    name: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "joined_date",
    },
  }
);

export const Publisher = model<PublisherInterface>(
  "Publisher",
  PublisherSchema
);
