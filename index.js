const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http')



dotenv.config({ path: './config.env' });
const app = require('./app');



const db = process.env.HOSTED_DATABASE_CONNECTION_STRING.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  ); 
  
  mongoose 
    .connect(db, {   
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((con) => { 
      console.log('Database is connected');
    });
  

     
const server = http.createServer(app);
 

const PORT = process.env.PORT || 1000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
 