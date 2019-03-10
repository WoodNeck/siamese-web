import mongoose from 'mongoose';


export default async () => {
  await mongoose.connect('mongodb://localhost:27017/siamese', {
    autoIndex: false,
    useNewUrlParser: true,
    useFindAndModify: false,
  }).catch(err => {
    console.error('데이터베이스 연결 실패');
    console.error(err.toString());
    throw err;
  });

  return mongoose.connection;
}
