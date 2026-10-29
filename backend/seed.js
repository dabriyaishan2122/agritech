require('dotenv').config();
const mongoose = require('mongoose'), bcrypt = require('bcryptjs');
const M = require('./models');
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Promise.all(Object.values(M).map(x => x.deleteMany({})));
  const pw = await bcrypt.hash('Password@123', 10);
  const [admin, farmer] = await M.User.create([{ name: 'Admin', email: 'admin@agritech.com', password: pw, role: 'admin' }, { name: 'Ramesh Patel', email: 'farmer@agritech.com', password: pw }]);
  const farm = await M.Farm.create({ owner: farmer._id, name: 'North Field', location: 'Indore, MP', areaAcres: 4, soilType: 'Black soil' });
  await M.Crop.create({ owner: farmer._id, farm: farm._id, name: 'Soybean', sowingDate: new Date(), ph: 5.8, nitrogen: 250, phosphorus: 14, potassium: 130, soilReport: 'Soil is acidic: add lime. Low nitrogen: apply urea or compost.' });
  await M.Resource.create([{ name: 'Urea (50 kg)', category: 'Fertilizer', price: 270, stock: 200 }, { name: 'Hybrid Wheat Seeds (10 kg)', category: 'Seeds', price: 650, stock: 80 }, { name: 'Neem Oil (1 L)', category: 'Pesticide', price: 420, stock: 60 }]);
  await M.Alert.create([{ title: 'Yellow Mosaic Virus risk', message: 'Whitefly activity rising in soybean. Spray neem oil.', crop: 'Soybean', severity: 'high' }, { title: 'Fall armyworm watch', message: 'Scout maize fields weekly.', crop: 'Maize', severity: 'medium' }]);
  await M.Post.create({ owner: farmer._id, authorName: 'Ramesh Patel', type: 'question', title: 'Best time to sow wheat?', body: 'Black soil, Indore region.' });
  console.log('Seeded. Admin: admin@agritech.com, Farmer: farmer@agritech.com, password: Password@123');
  process.exit();
})();
