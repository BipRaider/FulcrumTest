import { userModel, forkModel } from '../../models';

export interface IFork {
  name: string;
  email: string;
  password: string;
  user: string | number;
}

export default async (data: IFork): Promise<void> => {
  try {
    const { user } = data;

    const newFork = await forkModel.create({
      ...data,
    });

    console.dir(newFork);

    await userModel.findByIdAndUpdate(user, newFork);
  } catch (error) {
    throw error;
  }
};
