import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import router from './routes/index';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log('Server failed to start due to database connection error!');
  });

