import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = {
  availableLocals: ['en'],
  defaultLanguage: 'en',
  whiteListOrigin: 'http://localhost:3000',
  projectRoot: path.join(__dirname, '..'),
  enviornment: 'development',
  port: '8080',
  dbHost: '127.0.0.1',
  dbDatabaseName: 'financedev',
  dbAdmin: 'root',
  dbPassword: '',
};

export default config;
