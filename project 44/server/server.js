import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/generate-report', async (req, res) => {
  const { responses } = req.body;
  
  // Extract key information from responses
  const propertyType = responses?.propertyBasics?.propertyType || '';
  const propertyValue = responses?.propertyBasics?.valuation?.currentValue || 0;
  const jurisdiction = responses?.propertyBasics?.location?.jurisdiction || '';
  const condition = responses?.propertyDetails?.condition || '';
  const size = responses?.propertyBasics?.totalArea || '';
  
  // Create the report object with existing data
  const report = { ...responses };
  
  res.json(report);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));