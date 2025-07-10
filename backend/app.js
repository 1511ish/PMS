const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB_HOST)
    .then(res => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`);
        })
    })
    .catch(err => console.log(err));
