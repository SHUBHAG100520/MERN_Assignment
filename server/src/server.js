import 'dotenv/config';
import { connectDB } from './config/db.js';
import app from './app.js';

const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  })
  .catch((e) => {
    console.error('DB connection failed', e);
    process.exit(1);
  });
