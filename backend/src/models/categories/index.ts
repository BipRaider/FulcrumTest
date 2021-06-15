'use strick';

import { Schema, Document, Model, model, Types } from 'mongoose';

import { IForkSchema } from '../fork';

export interface ICategoriesSchema extends Document {
  name: string;
  description: string;
  userId: string;
  forks: Array<IForkSchema>;
}

type TAggregateCategories = (
  userId: string,
  from: string,
  itemId: string,
) => Promise<ICategoriesSchema>;

type TChangeItemCategories = (
  userId: string | number,
  where: string,
  itemId: string | number,
) => Promise<ICategoriesSchema>;

export interface TCategoriesModel extends Model<ICategoriesSchema> {
  findCategoriesById: (id: string | number) => Promise<ICategoriesSchema>;
  removeCategories: (id: number | string) => Promise<void>;
  aggregateDB: TAggregateCategories;
  removeItemFromCategories: TChangeItemCategories;
  addItemInCategories: TChangeItemCategories;
}

const categoriesSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'user', required: true },
  forks: [{ type: Types.ObjectId, ref: 'fork' }],
});

const findCategoriesById = async function (id: string | number): Promise<ICategoriesSchema> {
  try {
    return await this.findById(id, { new: true });
  } catch (error) {
    throw error;
  }
};

const removeCategories = async function (id: number | string): Promise<void> {
  try {
    await this.deleteOne({ id });
  } catch (error) {
    throw error;
  }
};

const addItemInCategories: TChangeItemCategories = async function (userId, where, itemId) {
  try {
    return await this.findByIdAndUpdate(
      userId,
      {
        $push: { [where]: itemId },
      },
      { new: true },
    );
  } catch (error) {
    throw error;
  }
};

const removeItemFromCategories: TChangeItemCategories = async function (userId, where, itemId) {
  try {
    return await this.findByIdAndUpdate(
      userId,
      {
        $pull: { [where]: itemId },
      },
      { new: true },
    );
  } catch (error) {
    throw error;
  }
};

const aggregateDB: TAggregateCategories = async function (userId, from, itemId) {
  try {
    return await this.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from,
          localField: 'userId',
          foreignField: String(itemId),
          as: from,
        },
      },
      {
        $unwind: { path: `$${from}`, preserveNullAndEmptyArrays: true },
      },
      { $unset: ['__v'] },
    ]);
  } catch (error) {
    throw error;
  }
};

categoriesSchema.statics.removeCategories = removeCategories;
categoriesSchema.statics.findCategoriesById = findCategoriesById;
categoriesSchema.statics.addItemInCategories = addItemInCategories;
categoriesSchema.statics.removeItemFromCategories = removeItemFromCategories;
categoriesSchema.statics.aggregateDB = aggregateDB;

export default model<ICategoriesSchema, TCategoriesModel>('categories', categoriesSchema);
