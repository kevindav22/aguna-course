import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'no-mongo-uri';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error Connection to MongoDB', error);
  });

export default mongoose;