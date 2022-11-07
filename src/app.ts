import express from 'express';
import 'express-async-errors';
import httpErrorMiddleware from './middlewares/http.error.middleware';
import productRoutes from './routes/product.routes';

const app = express();

app.use(express.json());

app.use('/', productRoutes);

app.use(httpErrorMiddleware);

export default app;
