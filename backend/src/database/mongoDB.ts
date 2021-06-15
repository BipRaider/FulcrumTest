

import mongoose from 'mongoose';

import env from '../config/env.keys';

//Function for connection to database
export default async (): Promise<void> => {
  try {
    const connectDB = await mongoose.connect(env.DATABASE_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: "${connectDB.connection.host}"`);
  } catch (error) {
    console.log('Not connect db');
  }
};
