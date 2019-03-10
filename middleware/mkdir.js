import connectDB from '../assets/connectDB';
import Directory from '../models/directory';


export default async function ({ query }) {
  const db = await connectDB();
  if (!db) {
    throw new Error('데이터베이스 연결 실패');
  }
  Directory.updateOne(
    { name: query.dirName, guildId: query.guildId },
    {},
    { upsert: true }
  ).exec();
}
