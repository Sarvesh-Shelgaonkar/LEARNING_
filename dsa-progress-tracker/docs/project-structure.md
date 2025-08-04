# Project Structure Documentation

## Overview
This document outlines the folder structure and organization of the Community Learning Platform.

## 📁 Root Structure

```
dsa-progress-tracker/
├── public/                 # Static assets
├── src/                    # Source code
├── docs/                   # Documentation
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # TailwindCSS configuration
├── vite.config.js          # Vite configuration
└── README.md              # Project overview
```

## 📁 Source Code Structure (`src/`)

### Core Application Files
```
src/
├── main.jsx               # Application entry point
├── App.jsx                # Main App component with routing
├── index.css              # Global styles
└── App.css                # App-specific styles
```

### Components (`components/`)
```
components/
├── Auth/
│   ├── Login.jsx          # Login form component
│   └── Signup.jsx         # Signup form component
├── Dashboard/
│   ├── Dashboard.jsx      # Main dashboard component
│   ├── OverallProgress.jsx # Progress overview
│   └── TopicProgress.jsx  # Topic-wise progress
├── Profile/
│   ├── ProfileForm.jsx    # Profile editing form
│   ├── ProfileHeader.jsx  # Profile header component
│   └── ProfileInfo.jsx    # Profile information display
└── UI/
    ├── LoadingSpinner.jsx # Loading component
    ├── Toast.jsx          # Toast notifications
    └── Navbar.jsx         # Navigation component
```

### Pages (`pages/`)
```
pages/
├── Dashboard.jsx          # Main dashboard page
├── Profile.jsx            # User profile page
├── Notes.jsx              # Learning resources page
├── CoreSubjectsNotes.jsx  # Core subjects notes
├── CppStlNotes.jsx        # C++ STL notes
├── DsaPdfNotes.jsx        # DSA PDF notes
├── SqlNotes.jsx           # SQL notes
├── SystemDesignNotes.jsx  # System design notes
└── WebdevNotes.jsx        # Web development notes
```

### Features (`features/`)
```
features/
├── interview/
│   ├── components/
│   │   ├── InterviewForm.jsx      # Submit interview experience
│   │   ├── InterviewList.jsx      # List all experiences
│   │   ├── InterviewDetail.jsx    # Detailed experience view
│   │   └── InterviewFilter.jsx    # Company filter component
│   ├── pages/
│   │   ├── InterviewExperiences.jsx # Main interview page
│   │   └── SubmitExperience.jsx   # Submit new experience
│   └── hooks/
│       └── useInterviews.js       # Interview data hooks
├── mentorship/
│   ├── components/
│   │   ├── SessionCard.jsx        # Session display card
│   │   ├── SessionForm.jsx        # Create new session
│   │   ├── PaymentModal.jsx       # Payment integration
│   │   └── MentorDashboard.jsx    # Mentor management
│   ├── pages/
│   │   ├── MentorshipSessions.jsx # Browse sessions
│   │   ├── MentorDashboard.jsx    # Mentor dashboard
│   │   └── SessionDetail.jsx      # Session details
│   └── hooks/
│       └── useMentorship.js       # Mentorship data hooks
├── articles/
│   ├── components/
│   │   ├── ArticleCard.jsx        # Article display card
│   │   ├── ArticleForm.jsx        # Submit article
│   │   └── ArticleSearch.jsx      # Search functionality
│   ├── pages/
│   │   ├── Articles.jsx           # Articles listing
│   │   └── SubmitArticle.jsx      # Submit new article
│   └── hooks/
│       └── useArticles.js         # Articles data hooks
└── community/
    ├── components/
    │   ├── MeetCard.jsx           # Community meet card
    │   ├── MeetForm.jsx           # Create new meet
    │   ├── MeetFilter.jsx         # Filter by type
    │   └── JoinButton.jsx         # Join session button
    ├── pages/
    │   ├── CommunityMeets.jsx     # Community meets listing
    │   ├── CreateMeet.jsx         # Create new meet
    │   └── MeetDetail.jsx         # Meet details
    └── hooks/
        └── useCommunity.js        # Community data hooks
```

### Contexts (`contexts/`)
```
contexts/
├── AuthContext.jsx        # Authentication context
└── PaymentContext.jsx     # Payment state management
```

### Firebase (`firebase/`)
```
firebase/
├── config.js              # Firebase configuration
├── auth.js                # Authentication utilities
├── firestore.js           # Firestore utilities
└── stripe.js              # Stripe payment utilities
```

### Hooks (`hooks/`)
```
hooks/
├── useAuth.js             # Authentication hooks
├── useLocalStorage.js     # Local storage utilities
├── useProgress.js         # Progress tracking hooks
└── useFirestore.js        # Firestore data hooks
```

### Data (`data/`)
```
data/
├── dsaProblems.js         # DSA problems data
├── companies.js           # Company list for interviews
├── topics.js              # Technical topics
└── constants.js           # Application constants
```

### Utils (`utils/`)
```
utils/
├── validation.js          # Form validation utilities
├── formatting.js          # Data formatting utilities
├── email.js              # Email utilities
└── payment.js            # Payment processing utilities
```

## 🔄 Data Flow

### Authentication Flow
1. User signs up/logs in via `AuthContext`
2. User data stored in Firestore
3. Protected routes check authentication
4. User context available throughout app

### Feature Data Flow
1. Components use custom hooks (`useInterviews`, `useMentorship`, etc.)
2. Hooks interact with Firestore collections
3. Real-time updates via Firebase listeners
4. UI updates automatically

### Payment Flow
1. User selects mentorship session
2. Payment modal opens with Stripe
3. Payment processed via Firebase Functions
4. Enrollment recorded in Firestore
5. Confirmation email sent

## 🎯 Key Design Principles

### Modular Architecture
- Each feature is self-contained in its own folder
- Shared components in `components/UI/`
- Feature-specific components in `features/[feature]/components/`

### Separation of Concerns
- Business logic in custom hooks
- UI components are presentational
- Data management centralized in Firestore
- Authentication handled by Firebase

### Scalability
- Easy to add new features
- Consistent folder structure
- Reusable components
- Centralized configuration

## 🔧 Configuration Files

### Firebase Configuration
- `firebase/config.js`: Firebase app initialization
- Environment variables for API keys
- Firestore rules for security

### TailwindCSS Configuration
- `tailwind.config.js`: Custom theme and plugins
- Responsive design utilities
- Dark mode support

### Vite Configuration
- `vite.config.js`: Build and development settings
- Plugin configurations
- Environment variable handling

## 📱 Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Component Structure
- Mobile-first approach
- Responsive navigation
- Adaptive layouts for all features

## 🔒 Security Considerations

### Authentication
- Firebase Auth for user management
- Protected routes for sensitive pages
- Role-based access control

### Data Security
- Firestore security rules
- Input validation on all forms
- XSS protection via React

### Payment Security
- Stripe for secure payments
- No sensitive data stored locally
- PCI compliance through Stripe 