# PaySphere - Modern Fintech Dashboard

A complete, responsive fintech dashboard built with React.js that provides users with a comprehensive financial management experience. PaySphere offers balance tracking, payment management, transaction analytics, and personalized settings in a modern, intuitive interface.

![PaySphere Dashboard](https://via.placeholder.com/800x400/10b981/ffffff?text=PaySphere+Dashboard)

## 🌟 Features

### 🔐 Authentication System
- **Secure Login/Signup** with form validation
- **Demo credentials** for easy testing
- **Session management** with localStorage
- **Password strength indicator** on signup
- **Remember me** functionality

### 📊 Dashboard Overview
- **Real-time balance display** with trend indicators
- **Quick action buttons** for common tasks
- **Recent transaction history** with status badges
- **Key metrics cards** (balance, payments, spending)
- **Responsive grid layout** for all screen sizes

### 💸 Payment Management
- **Send Money** with recipient validation
- **Request Payments** from other users
- **Transaction History** with search and filtering
- **Status tracking** (completed, pending, failed)
- **Category-based organization** (food, transport, entertainment, etc.)
- **Export functionality** for record keeping

### 📈 Advanced Analytics
- **Interactive Charts** using Recharts library
- **Monthly Spending Trends** with comparative data
- **Category Breakdown** with pie charts and percentages
- **Balance History** tracking over time
- **Spending vs Income** comparative analysis
- **Custom date range** filtering

### ⚙️ Comprehensive Settings
- **Profile Management** with avatar upload
- **Security Settings** including password change
- **Two-Factor Authentication** toggle
- **Notification Preferences** (email, SMS, push)
- **Theme Customization** (light/dark mode)
- **Account Information** display

### 🎨 Modern UI/UX
- **Responsive Design** works on all devices
- **Dark/Light Mode** with system preference detection
- **Smooth Animations** and micro-interactions
- **Toast Notifications** for user feedback
- **Loading States** and skeleton screens
- **Accessibility** compliant components

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/paysphere.git
   cd paysphere
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   yarn install
   # or
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Frontend (.env):
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```
   
   Backend (.env):
   ```env
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=paysphere
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   python server.py
   # Server runs on http://localhost:8001
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   yarn start
   # or
   npm start
   # App runs on http://localhost:3000
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - Use demo credentials to login and explore features

## 🔑 Demo Credentials

For testing purposes, use these credentials:

```
Email: john.doe@example.com
Password: password123
```

## 📱 Usage Guide

### Getting Started
1. **Login** using demo credentials or create a new account
2. **Explore Dashboard** to see your financial overview
3. **Send Payment** using the quick action button
4. **View Analytics** to understand spending patterns
5. **Customize Settings** to personalize your experience

### Key Workflows

#### Sending Money
1. Click "Send Money" button
2. Enter recipient name/email
3. Specify amount and description
4. Confirm and send
5. View transaction in history

#### Viewing Analytics
1. Navigate to Analytics page
2. Switch between different chart views
3. Filter by date ranges
4. Export data for external use

#### Managing Profile
1. Go to Settings > Profile
2. Update personal information
3. Change avatar image
4. Save changes

## 🏗️ Project Structure

```
paysphere/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Shadcn UI components
│   │   │   └── DashboardLayout.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Payments.js
│   │   │   ├── Analytics.js
│   │   │   └── Settings.js
│   │   ├── data/
│   │   │   └── mockData.js      # Mock data for frontend
│   │   ├── hooks/
│   │   │   └── use-toast.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── .env
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Recharts** - Responsive chart library
- **Lucide React** - Beautiful icon set
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - Modern, fast Python web framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Python-jose** - JWT token handling

### Development Tools
- **Yarn** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Craco** - Create React App Configuration Override

## 🎯 Key Features Breakdown

### Authentication Flow
- Form validation with real-time feedback
- Secure password handling
- Session persistence
- Automatic redirects based on auth state

### Dashboard Components
- **StatCard**: Reusable metric display component
- **TransactionItem**: Individual transaction row
- **QuickActions**: Shortcut buttons for common tasks
- **BalanceOverview**: Financial summary cards

### Payment System
- Modal-based payment forms
- Real-time form validation
- Transaction status tracking
- Search and filter functionality
- Category-based organization

### Analytics Engine
- Multiple chart types (bar, line, pie, area)
- Interactive tooltips and legends
- Responsive chart sizing
- Custom color schemes
- Data export capabilities

### Settings Management
- Tabbed interface for organization
- Profile image upload simulation
- Password change with confirmation
- Notification preference toggles
- Theme switching with persistence

## 🔧 Customization

### Theming
The app uses CSS custom properties for theming:
```css
:root {
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* Add your custom colors */
}
```

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `App.js`
4. Add mock data in `src/data/mockData.js`

### Styling Guidelines
- Use Tailwind utility classes
- Follow component composition patterns
- Maintain consistent spacing and typography
- Use semantic color names
- Ensure responsive design

## 🚦 API Endpoints (Future Backend Integration)

```
POST /api/auth/login          # User authentication
POST /api/auth/signup         # User registration
GET  /api/user/profile        # Get user profile
PUT  /api/user/profile        # Update user profile
GET  /api/transactions        # Get transaction history
POST /api/transactions        # Create new transaction
GET  /api/analytics/spending  # Get spending analytics
GET  /api/analytics/balance   # Get balance history
```

## 📈 Performance Features

- **Code Splitting** with React.lazy()
- **Image Optimization** with lazy loading
- **Bundle Analysis** for size monitoring
- **Caching Strategies** for API responses
- **Skeleton Loading** for better UX

## 🧪 Testing

### Running Tests
```bash
cd frontend
yarn test
# or
npm test
```

### Test Coverage
- Component rendering tests
- User interaction tests
- API integration tests
- Accessibility tests

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the production version
   ```bash
   yarn build
   ```
2. Deploy to your preferred platform
3. Set environment variables

### Backend Deployment
1. Set up MongoDB Atlas or cloud database
2. Deploy to Heroku, Railway, or similar platform
3. Configure environment variables
4. Set up CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Recharts](https://recharts.org/) for the amazing chart components
- [Lucide](https://lucide.dev/) for the clean, consistent icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first approach

## 📞 Support

For support, email support@paysphere.com or join our Discord community.

## 🗺️ Roadmap

- [ ] Real backend integration
- [ ] Mobile app (React Native)
- [ ] Advanced security features
- [ ] Multi-currency support
- [ ] API rate limiting
- [ ] Advanced analytics
- [ ] Integration with banks
- [ ] Cryptocurrency support
- [ ] Investment tracking
- [ ] Bill payment reminders

---
