const express = require('express');
const cors = require('cors');
const productRoutes = require('./api/routes/product_routes');
const userController = require('./api/controllers/user_controller'); 
const { connectDB } = require('./api/config/database');
const chatRoutes = require('./api/routes/chat_routes');
const progressRoutes = require('./api/routes/progress_routes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/chat', chatRoutes);

app.use('/products', productRoutes);
app.use('/api/progress', progressRoutes);

app.post('/register', userController.registerUser);
app.get('/users', userController.listUsers); 
app.post('/login', userController.loginUser)
app.delete('/users/:userId', userController.deleteUser);
app.put('/users/:userId', userController.updateUser);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

