import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
      index: true, // 👈 Додано індекс згідно з ТЗ
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('note', noteSchema);
