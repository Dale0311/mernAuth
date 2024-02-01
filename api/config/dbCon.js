import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to the Database');
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
