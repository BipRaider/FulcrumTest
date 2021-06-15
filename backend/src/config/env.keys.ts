
import dotenv from 'dotenv';
import path from 'path';

//Taking data from env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

export default {
  ...process.env,
};
