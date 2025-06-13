
import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employees';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/employees', employeeRoutes);

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
