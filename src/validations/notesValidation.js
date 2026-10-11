import { Joi } from 'celebrate';
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};

export const noteIdSchema = {
  params: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').default(''),
    tag: Joi.string()
      .valid(...TAGS)
      .default('Todo'),
  }),
};

export const updateNoteSchema = {
  params: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1), // Тіло запиту не має бути порожнім
};
