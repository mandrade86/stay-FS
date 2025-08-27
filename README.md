# 🚀 Code Challenge: Senior Full Stack Engineer

## 📋 Challenge Description

This challenge evaluates your skills as a **Senior Full Stack Engineer** in creating a subscription management platform. You will build both the frontend and backend of a system that allows users to manage product subscriptions.

## 🎯 Challenge Objectives

### Frontend (React + TypeScript)
- Create a functional and responsive user interface
- Implement basic authentication
- Develop main components
- Connect with REST APIs
- Implement user authentication

### Backend (Nest.js + TypeScript)
- Design and implement REST APIs
- Create database schemas
- Implement authentication and authorization
- Handle validations and error handling
- Structure code in a scalable way

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   React + TS    │◄──►│   Nest.js       │◄──►│   MongoDB       │
│   Material-UI   │    │   TypeScript    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
stay-FS/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utilities
│   ├── package.json
│   └── tsconfig.json
├── backend/                 # Nest.js API
│   ├── src/
│   │   ├── modules/        # Application modules
│   │   ├── common/         # Shared code
│   │   ├── config/         # Configurations
│   │   └── main.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml       # Service orchestration
├── env.example             # Environment variables example
└── README.md               # This file
```

## 🚀 Features to Implement

### 1. User Authentication
- Simple login and registration
- Basic JWT token

### 2. Product Management
- Product list
- Add product

### 3. Subscription System
- Create subscription
- View subscriptions

### 4. Dashboard
- Main page with summary
- Basic navigation

## 🛠️ Required Technologies

### Frontend
- React + TypeScript
- Basic Material-UI
- Simple React Router

### Backend
- Nest.js + TypeScript
- Mongoose for MongoDB
- Basic JWT

### Database
- MongoDB 6+
- Mongoose ODM
- No migrations (flexible schemas)

### DevOps
- Docker and Docker Compose
- Environment variables
- Development scripts

## 📋 Evaluation Criteria

### Code (40%)
- **Quality**: Clean, readable and well-structured code
- **Architecture**: Appropriate design patterns
- **TypeScript**: Effective use of types and interfaces

### Frontend (25%)
- **UI/UX**: Intuitive and responsive interface
- **Components**: Reusable and well-documented
- **State**: Efficient state management
- **Performance**: Optimizations and lazy loading

### Backend (25%)
- **API Design**: RESTful and well-documented
- **Security**: Authentication and validations
- **Database**: Schemas and relationships
- **Error Handling**: Robust error handling

### DevOps (10%)
- **Docker**: Proper containerization
- **Environment Variables**: Secure configuration
- **Documentation**: README and comments

## 🚀 Execution Instructions

### ⚡ **For Rapid Development (1 hour)**
Check [QUICK_INSTRUCTIONS.md](./QUICK_INSTRUCTIONS.md) for an optimized step-by-step guide.

**Note**: We also provide Spanish versions: [INSTRUCCIONES_RAPIDAS.md](./INSTRUCCIONES_RAPIDAS.md) and [INSTALACION.md](./INSTALACION.md)

### 1. Clone and Configure
```bash
git clone <repository-url>
cd stay-FS
cp env.example .env
# Edit .env with your configurations
```

### 2. Run with Docker
```bash
docker-compose up -d
```

### 3. Access Applications
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Swagger API**: http://localhost:3001/api

## 📝 Expected Deliverables

1. **Source code** complete and functional
2. **README** with installation and usage instructions
3. **API documentation** (Swagger)
4. **Docker** configured and working

## ⏱️ Estimated Time

- **Development**: 45 minutes
- **Verification**: 10 minutes
- **Documentation**: 5 minutes
- **Total**: 1 hour

## 🎯 Bonus Points

- Implement E2E tests with Playwright
- Add CI/CD with GitHub Actions
- Implement logging and monitoring
- Add rate limiting and caching
- Implement real-time notifications

## 📞 Support

If you have questions during development, you can:
- Review the technology documentation
- Check examples in official repositories
- Contact the recruitment team

---

**Good luck! We're excited to see your solution.** 🎉
