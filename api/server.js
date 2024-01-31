import indexRouter from './routes/index.js';
import express from 'express';
const app = express();

const PORT = 5500;
app.use('/', indexRouter);
app.listen(PORT, () => {
  console.log(`Server listen in PORT ${PORT}`);
});
