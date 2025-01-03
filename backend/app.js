import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users',userRouter)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the project' });
  });

export default app;