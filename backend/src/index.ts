
import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employees';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/employees', employeeRoutes);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
