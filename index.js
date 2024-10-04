// index.js ou app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./api/routes/user_routes'); // Importa as rotas de usuário
const uploadRoutes = require('./api/routes/upload_routes'); // Importa as rotas de upload
const { connectDB } = require('./api/config/database');

const app = express();

app.use(cors());
app.use(express.json());

// Conectando ao banco de dados
connectDB();

// Registrando as rotas
app.use('/api/users', userRoutes); // A rota /upload-photo será acessível em /api/users/upload-photo
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
