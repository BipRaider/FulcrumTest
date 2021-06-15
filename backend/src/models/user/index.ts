import { Schema, Document, Model, model, Types } from 'mongoose';
import { ICategoriesSchema } from '../categories';
import { IForkSchema } from '../fork';

export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;

  forks: Array<IForkSchema>;
  categories: Array<ICategoriesSchema>;
}

type TFindUserByIdAndUpdate = (id: string | number, newParams: string) => Promise<IUserSchema>;
type TFindUserByEmail = (email: string) => Promise<IUserSchema>;

type TChangeItemUser = (
  userId: string | number,
  where: string,
  itemId: string | number,
) => Promise<IUserSchema>;

// type TAggregateUser = (userId: string, from: string, itemId: string) => Promise<IUserSchema>;

export interface TUserModel extends Model<IUserSchema> {
  findUserByIdAndUpdate: TFindUserByIdAndUpdate;
  findUserByEmail: TFindUserByEmail;
  removeItemFromUser: TChangeItemUser;
  addItemInUser: TChangeItemUser;
  // aggregateDB: TAggregateUser;
}

const userSchema = new Schema<IUserSchema & TUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  forks: [{ type: Types.ObjectId, ref: 'fork' }],
  categories: [{ type: Types.ObjectId, ref: 'categories' }],
});

const findUserByEmail: TFindUserByEmail = async function (email) {
  try {
    return await this.findOne({ email });
  } catch (error) {
    throw error;
  }
};

const findUserByIdAndUpdate: TFindUserByIdAndUpdate = async function (id, newParams) {
  try {
    return await this.findByIdAndUpdate(id, { $set: newParams }, { new: true });
  } catch (error) {
    throw error;
  }
};

const addItemInUser: TChangeItemUser = async function (userId, where, itemId) {
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

const removeItemFromUser: TChangeItemUser = async function (userId, where, itemId) {
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

// const aggregateDB: TAggregateUser = async function (userId, from, itemId) {
//   try {
//     return await this.aggregate([
//       {
//         $match: { _id: userId }, // искать в како мто из item
//       },
//       {
//         $lookup: {
//           from, //  смотреть в данную коллекцию DB
//           localField: String(itemId), //строка на которую смотреть в нутрии item
//           foreignField: String(itemId), //данные должны совпасть  с  данными из localField
//           as: from, // куда потом всё скинуть
//         },
//       },
//       {
//         // убирает пустые пробелы  делает спрэд операцию
//         $unwind: { path: `$${from}`, preserveNullAndEmptyArrays: true },
//       },
//       {
//         // создаёт проект  с распарсенными значениями
//         $project: {
//           name: 1,
//           description: 1,
//           userId: 1,
//           data: 1,
//           [from]: { name: 1, description: 1, userId: 1, data: 1 },
//         },
//       },
//       // Те строки что не надо возвращать
//       { $unset: ['password', 'name', 'email', '__v', '_id'] },
//     ]);
//   } catch (error) {
//     throw error;
//   }
// };

userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.addItemInUser = addItemInUser;
userSchema.statics.removeItemFromUser = removeItemFromUser;
// userSchema.statics.aggregateDB = aggregateDB;
export default model<IUserSchema, TUserModel>('user', userSchema);
