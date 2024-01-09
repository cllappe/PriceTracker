import { mysql2 } from 'mysql2';
import 'dotenv/config';

const connection = mysql2.createConnection(process.env.DATABASE_URL);

connection.end();