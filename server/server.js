import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import User from './models/User.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
await connectDB();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// JSON middleware
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        mongodb: 'connected'
    });
});

// Manual user sync endpoint
app.post('/api/users/sync', async (req, res) => {
    try {
        const { id, firstName, lastName, emailAddresses, imageUrl } = req.body;
        if (!id || !emailAddresses || emailAddresses.length === 0) {
            return res.status(400).json({ error: 'Missing required user data' });
        }
        const userData = {
            _id: id,
            name: `${firstName || ''} ${lastName || ''}`.trim() || 'User',
            email: emailAddresses[0].emailAddress,
            image: imageUrl || ''
        };
        const existingUser = await User.findById(id);
        if (existingUser) {
            return res.json({ 
                message: 'User already exists', 
                user: existingUser 
            });
        }
        
        // Create new user
        const user = await User.create(userData);
        
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to sync user',
            details: error.message 
        });
    }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id, firstName, lastName, emailAddresses, imageUrl } = req.body;
        const userData = {
            name: `${firstName || ''} ${lastName || ''}`.trim(),
            email: emailAddresses?.[0]?.emailAddress,
            image: imageUrl
        };
        const user = await User.findByIdAndUpdate(
            id,
            userData, 
        );  
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    });
});

app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
    console.log(` Health: http://localhost:${PORT}/api/health`);
    console.log(` User Sync: http://localhost:${PORT}/api/users/sync\n`);
});