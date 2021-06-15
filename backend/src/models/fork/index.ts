'use strick';
import { Schema, Document, Model, model, Types } from 'mongoose';

export interface IForkSchema extends Document {
  name: string;
  description: string;
  data: string;
  userId: string;
  categoriesId: string;
}

type TAggregateFork = (userId: string, from: string, itemId: string) => Promise<IForkSchema>;

export interface TForkModel extends Model<IForkSchema> {
  findForkById: (id: string | number) => Promise<IForkSchema>;
  removeFork: (id: number | string) => Promise<void>;
  aggregateDB: TAggregateFork;
}

const forkSchema: Schema = new Schema<IForkSchema & TForkModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  data: { type: Date, default: Date.now(), required: true },
  userId: { type: Types.ObjectId, ref: 'user', required: true },
  categoriesId: { type: Types.ObjectId, ref: 'categories', required: true, default: 'all' },
});

const findForkById = async function (id: number | string): Promise<IForkSchema> {
  try {
    return await this.findById(id, { new: true });
  } catch (error) {
    throw error;
  }
};

const removeFork = async function (id: number | string): Promise<void> {
  try {
    await this.deleteOne({ id });
  } catch (error) {
    throw error;
  }
};

const aggregateDB: TAggregateFork = async function (userId, from, itemId) {
  try {
    return await this.aggregate([
      {
        $match: { _id: itemId },
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

forkSchema.statics.removeFork = removeFork;
forkSchema.statics.findForkById = findForkById;
forkSchema.statics.aggregateDB = aggregateDB;
export default model<IForkSchema, TForkModel>('fork', forkSchema);
