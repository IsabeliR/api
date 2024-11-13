const express = require('express');
const cors = require('cors');
const userRoutes = require('./api/routes/user_routes');
const uploadRoutes = require('./api/routes/upload_routes');
const { connectDB } = require('./api/config/database')
const ProductRoutes = require('./api/routes/materia_routes');
const progressRoutes = require('./api/routes/progress_routes');
const chatRoutes = require('./api/routes/chat_routes');

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());

connectDB();

app.use('/api/progress', progressRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
