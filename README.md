# SafeLearn India - Disaster Management Education Platform

A comprehensive full-stack web application designed to provide disaster preparedness education for Indian educational institutions.

## 🚀 Features

### Frontend (React + TypeScript)
- **Interactive Learning Modules** with embedded YouTube videos and quizzes
- **Virtual Drill Simulations** with real-time feedback
- **Gamified Learning System** with badges and leaderboards
- **Emergency Contact Directory** with regional filtering
- **Admin Dashboard** for institutional management
- **Real-time Drill Alerts** using Socket.IO
- **Responsive Design** optimized for mobile and desktop

### Backend (Node.js + Express)
- **RESTful API** with organized route structure
- **Real-time Communication** using Socket.IO
- **JWT Authentication** for secure access
- **Quiz Engine** with scoring and feedback
- **Mock Database** with realistic data structures
- **CORS and Security** middleware

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd safelearn-india
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
NODE_ENV=development
JWT_SECRET=your-secret-key-here
PORT=5000
```

### 4. Run the Application

#### Development Mode (Recommended)
Run both frontend and backend simultaneously:
```bash
npm run dev:full
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

#### Separate Processes
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

## 📁 Project Structure

```
safelearn-india/
├── src/                          # Frontend React application
│   ├── components/              # React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Landing page
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── LearningModules.tsx # Module listing
│   │   ├── ModuleDetail.tsx    # Individual module view
│   │   ├── Games.tsx           # Game listing
│   │   ├── VirtualDrills.tsx   # Drill simulations
│   │   ├── EmergencyContacts.tsx # Emergency directory
│   │   ├── AdminPanel.tsx      # Admin dashboard
│   │   └── ...
│   ├── contexts/               # React contexts
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── SocketContext.tsx   # Socket.IO connection
│   ├── services/               # API services
│   │   └── api.js             # API client
│   └── ...
├── server/                      # Backend Node.js application
│   ├── routes/                 # API routes
│   │   ├── auth.js            # Authentication
│   │   ├── modules.js         # Learning modules
│   │   ├── games.js           # Games and quizzes
│   │   ├── drills.js          # Virtual drills
│   │   ├── emergency.js       # Emergency contacts
│   │   └── admin.js           # Admin functions
│   └── index.js               # Server entry point
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎮 Key Features Explained

### 1. Interactive Learning Modules
- **Video Integration**: Embedded YouTube tutorials for each disaster type
- **Quiz System**: MCQ-based assessments with instant feedback
- **Progress Tracking**: Badge system for completed modules
- **Regional Content**: Location-specific disaster information

### 2. Virtual Drill Simulations
- **Scenario-Based Training**: Step-by-step emergency procedures
- **Real-time Feedback**: Immediate guidance during drills
- **Performance Tracking**: Completion rates and improvement metrics
- **Multi-Disaster Types**: Earthquake, fire, flood, cyclone scenarios

### 3. Gamified Learning
- **Interactive Games**: 5 different game types (simulation, quiz, puzzle, strategy)
- **Scoring System**: Points and percentage-based evaluation
- **Leaderboards**: Institution-wide competition
- **Achievement Badges**: Recognition for milestones

### 4. Real-time Communication
- **Socket.IO Integration**: Live drill alerts and notifications
- **Institution Rooms**: Targeted messaging by school/college
- **Browser Notifications**: Desktop alerts for emergency drills
- **Connection Status**: Real-time connectivity indicators

### 5. Admin Dashboard
- **Module Creation**: Add new learning content with videos and quizzes
- **Drill Management**: Schedule and trigger live emergency drills
- **Analytics**: Track student progress and institutional preparedness
- **User Management**: Role-based access control

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Learning Modules
- `GET /api/modules` - Get all modules (with filters)
- `GET /api/modules/:id` - Get specific module
- `POST /api/modules/:id/quiz` - Submit quiz answers
- `POST /api/modules` - Create new module (admin)

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get specific game
- `POST /api/games/:id/score` - Submit game score
- `GET /api/games/:id/leaderboard` - Get leaderboard

### Virtual Drills
- `GET /api/drills` - Get all drills
- `GET /api/drills/:id` - Get specific drill
- `POST /api/drills/:id/complete` - Complete drill

### Emergency Contacts
- `GET /api/emergency/contacts` - Get emergency contacts
- `GET /api/emergency/alerts` - Get disaster alerts

### Admin
- `GET /api/admin/dashboard` - Get admin statistics
- `POST /api/admin/drills/trigger` - Trigger live drill
- `POST /api/admin/modules/create` - Create new module

## 🚨 Real-time Features

### Socket.IO Events
- `connection` - User connects to server
- `join-institution` - Join institution-specific room
- `drill-alert` - Receive emergency drill notifications
- `disconnect` - User disconnects

### Browser Notifications
The app requests notification permissions and shows desktop alerts for:
- Emergency drill announcements
- Quiz completion confirmations
- Badge achievements

## 🧪 Testing

### Manual Testing Checklist
- [ ] All navigation buttons work correctly
- [ ] Module videos open in new tabs
- [ ] Quiz submission and scoring functions
- [ ] Game interactions and leaderboards
- [ ] Real-time drill alerts
- [ ] Admin panel functionality
- [ ] Mobile responsiveness
- [ ] Error handling (offline mode)

### Error Scenarios to Test
1. **Network Disconnection**: Verify error messages appear
2. **Invalid API Responses**: Check graceful error handling
3. **Socket Disconnection**: Ensure reconnection attempts
4. **Quiz Timeout**: Test submission under poor connectivity

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Server-side data validation
- **Role-based Access**: Admin-only routes protection
- **Error Sanitization**: No sensitive data in error messages

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=your-production-secret
PORT=5000
```

### Deployment Checklist
- [ ] Update API base URL for production
- [ ] Configure CORS for production domain
- [ ] Set secure JWT secret
- [ ] Enable HTTPS
- [ ] Configure Socket.IO for production

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **Socket Connection Failed**
   - Check if backend server is running
   - Verify CORS configuration
   - Check browser console for errors

3. **API Requests Failing**
   - Verify backend server is running on port 5000
   - Check network connectivity
   - Review browser developer tools

4. **Quiz Not Submitting**
   - Check browser console for JavaScript errors
   - Verify API endpoint is accessible
   - Test with network tab open

### Debug Mode
Enable detailed logging by setting:
```env
DEBUG=true
```

## 📱 Mobile Optimization

- **Responsive Design**: Tailwind CSS breakpoints
- **Touch-friendly**: Large buttons and touch targets
- **Performance**: Optimized images and lazy loading
- **Offline Handling**: Service worker for basic offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**SafeLearn India** - Building disaster-ready educational institutions across India 🇮🇳