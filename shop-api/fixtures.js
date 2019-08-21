const mongoose = require('mongoose');
const config = require('./config');
const nanoid = require('nanoid');

const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.dbUrl, config.mongoOptions);

  const connection = mongoose.connection;

  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }

  await User.create(
      {
          username: 'user',
          password: '123',
          role: 'user',
          token: nanoid()
      },
      {
          username: 'admin',
          password: '123',
          role: 'admin',
          token: nanoid()
      },
  );

  const [cpus, hdds] = await Category.create(
    {title: 'CPUs', description: 'Central Processing Units'},
    {title: 'HDDs', description: 'Hard Disk Drives'}
  );

  await Product.create(
    {
      title: 'Intel Core i7',
      price: 500,
      description: 'Very cool CPU',
      category: cpus._id,
      image: "cpu.jpg"
    },
    {
      title: 'Toshiba 500 GB',
      price: 60,
      description: 'A simple HDD',
      category: hdds._id,
      image: "hdd.jpg"
    }
  );

  return connection.close();
};


run().catch(error => {
  console.error('Something wrong happened...', error);
});
