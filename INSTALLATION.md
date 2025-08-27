# 🚀 Installation and Setup Guide

## 📋 Prerequisites

Before starting, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Docker** and **Docker Compose**
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd stay-FS
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp env.example .env

# Edit the .env file with your configurations
# You can use any text editor
nano .env
```

**Important**: Update the following variables in your `.env` file:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/subscription_db
MONGODB_DATABASE=subscription_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend Configuration
REACT_APP_API_URL=http://localhost:3001
```

### 3. Start Services with Docker

```bash
# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# Check if all services are running
docker-compose ps
```

### 4. Verify Services

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Check Backend logs
docker-compose logs backend

# Check Frontend logs
docker-compose logs frontend
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: localhost:27017

## 🔧 Manual Setup (Alternative)

If you prefer to run services manually instead of using Docker:

### MongoDB Setup

```bash
# Install MongoDB locally or use MongoDB Atlas
# For local installation on macOS:
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh --eval "db.runCommand('ping')"
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run start:dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 📊 Database

### MongoDB Connection

The application uses **MongoDB 6+** with **Mongoose ODM**.

**Advantage**: MongoDB doesn't require migrations, schemas are created automatically when inserting data.

### Database Structure

The system creates three main collections:

1. **users** - User accounts and authentication
2. **products** - Available products for subscription
3. **subscriptions** - User subscription data

## 🐛 Common Problem Solutions

### Port Already in Use

```bash
# Check what's using port 3000 or 3001
lsof -i :3000
lsof -i :3001

# Kill the process if needed
kill -9 <PID>
```

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
docker-compose ps mongodb

# Restart MongoDB service
docker-compose restart mongodb

# Check MongoDB logs
docker-compose logs mongodb
```

### Docker Issues

```bash
# Stop all services
docker-compose down

# Remove volumes (WARNING: This will delete all data)
docker-compose down -v

# Rebuild and start
docker-compose up --build -d
```

### Node Modules Issues

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔍 Verification Commands

### Check Service Status

```bash
# Check all running containers
docker ps

# Check service logs
docker-compose logs -f

# Check specific service logs
docker-compose logs -f backend
```

### Check Network Connectivity

```bash
# Check if MongoDB is accessible
netstat -an | grep 27017

# Check if backend is accessible
netstat -an | grep 3001

# Check if frontend is accessible
netstat -an | grep 3000
```

### Test API Endpoints

```bash
# Test backend health
curl http://localhost:3001/api/health

# Test MongoDB connection
curl http://localhost:3001/api/health/db
```

## 🚀 Development Workflow

### 1. Start Development Environment

```bash
# Start all services
docker-compose up -d

# Watch logs
docker-compose logs -f
```

### 2. Make Code Changes

The application uses volume mounts, so changes are reflected immediately:

- **Backend**: Changes in `backend/src/` are automatically reloaded
- **Frontend**: Changes in `frontend/src/` trigger hot reload

### 3. Stop Development Environment

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: Deletes data)
docker-compose down -v
```

## 📝 Useful Commands

### Development

```bash
# Install dependencies in both directories
npm install && cd ../frontend && npm install

# Run linting
cd backend && npm run lint
cd ../frontend && npm run lint

# Format code
cd backend && npm run format
```

### Docker Management

```bash
# View running containers
docker ps

# View container logs
docker logs <container_name>

# Execute commands in container
docker exec -it <container_name> /bin/bash

# View resource usage
docker stats
```

### Database Management

```bash
# Access MongoDB shell
docker exec -it subscription_mongodb mongosh

# List databases
show dbs

# Use subscription database
use subscription_db

# List collections
show collections
```

## 🌐 Production Deployment

### Environment Variables

For production, update your `.env` file:

```env
NODE_ENV=production
MONGODB_URI=mongodb://your-production-mongodb-uri
JWT_SECRET=your-production-secret-key
```

### Docker Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment

Consider deploying to:

- **MongoDB**: MongoDB Atlas, AWS DocumentDB
- **Backend**: Heroku, AWS ECS, Google Cloud Run
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront

## 📚 Additional Resources

- [Nest.js Documentation](https://docs.nestjs.com/)
- [React Documentation](https://reactjs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)

## 🆘 Getting Help

If you encounter issues:

1. **Check logs**: `docker-compose logs -f`
2. **Verify ports**: Ensure no conflicts
3. **Check dependencies**: Verify Node.js and npm versions
4. **Restart services**: `docker-compose restart`
5. **Check documentation**: Review this guide and official docs

---

**Happy coding! 🎉**
