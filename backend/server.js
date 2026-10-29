require('dotenv').config();
const express = require('express'), cors = require('cors'), mongoose = require('mongoose');
const { logger, errorHandler } = require('./middleware');
const r = require('./routes/modules');

const app = express();
app.use(cors({ origin: (process.env.CLIENT_URL || '*').split(',') }));
app.use(express.json());
app.use(logger);
app.get('/', (q, s) => s.json({ status: 'AgriTech API running' }));
app.use('/api/auth', require('./routes/auth'));
for (const k of Object.keys(r)) app.use('/api/' + k, r[k]);
app.use((q, s) => s.status(404).json({ message: 'Route not found' }));
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server up')))
  .catch(e => { console.error('MongoDB connection failed:', e.message); process.exit(1); });
