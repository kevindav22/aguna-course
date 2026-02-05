import mongoose, { Schema, Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  description: string;
  imageUrl: string;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Category>('Category', CategorySchema);
