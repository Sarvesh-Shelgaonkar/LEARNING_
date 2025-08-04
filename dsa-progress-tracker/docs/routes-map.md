# Routes Map Documentation

## Overview
This document outlines all the routes in the Community Learning Platform and their corresponding components.

## 🗺️ Route Structure

### Public Routes (No Authentication Required)
```
/                    → Redirect to /dashboard
/login              → Login component
/signup             → Signup component
/notes              → Learning resources
```

### Protected Routes (Authentication Required)
```
/dashboard          → Main dashboard
/profile            → User profile
/interviews         → Interview experiences
/mentorship         → Mentorship sessions
/articles           → Technical articles
/community          → Community meets
```

## 📋 Detailed Route Definitions

### Authentication Routes

#### `/login`
- **Component**: `Login.jsx`
- **Purpose**: User authentication
- **Features**:
  - Email/password login
  - Form validation
  - Error handling
  - Redirect to dashboard on success

#### `/signup`
- **Component**: `Signup.jsx`
- **Purpose**: User registration
- **Features**:
  - Email/password signup
  - Form validation
  - Account creation in Firebase
  - Redirect to dashboard on success

### Main Application Routes

#### `/dashboard`
- **Component**: `Dashboard.jsx`
- **Purpose**: Main application dashboard
- **Features**:
  - DSA progress overview
  - Quick access to features
  - Recent activity
  - Progress statistics

#### `/profile`
- **Component**: `Profile.jsx`
- **Purpose**: User profile management
- **Features**:
  - Profile information display
  - Profile editing
  - Progress history
  - Account settings

### Learning Resources Routes

#### `/notes`
- **Component**: `Notes.jsx`
- **Purpose**: Learning resources hub
- **Features**:
  - Links to all learning resources
  - Categorized resources
  - Search functionality

#### `/cpp-stl-notes`
- **Component**: `CppStlNotes.jsx`
- **Purpose**: C++ STL learning resources
- **Features**:
  - STL documentation
  - Code examples
  - Practice problems

#### `/dsa-pdf-notes`
- **Component**: `DsaPdfNotes.jsx`
- **Purpose**: DSA PDF resources
- **Features**:
  - PDF downloads
  - Topic-wise organization
  - Study materials

#### `/sql-notes`
- **Component**: `SqlNotes.jsx`
- **Purpose**: SQL learning resources
- **Features**:
  - SQL tutorials
  - Practice queries
  - Database concepts

#### `/system-design-notes`
- **Component**: `SystemDesignNotes.jsx`
- **Purpose**: System design resources
- **Features**:
  - Design patterns
  - Architecture examples
  - Case studies

#### `/core-subjects-notes`
- **Component**: `CoreSubjectsNotes.jsx`
- **Purpose**: Core CS subjects
- **Features**:
  - OS, DBMS, Networks
  - Theory and practice
  - Interview preparation

#### `/webdev-notes`
- **Component**: `WebdevNotes.jsx`
- **Purpose**: Web development resources
- **Features**:
  - Frontend/Backend tutorials
  - Framework guides
  - Best practices

### Feature Routes

#### `/interviews`
- **Component**: `InterviewExperiences.jsx`
- **Purpose**: Interview experience sharing
- **Features**:
  - Browse all experiences
  - Company filter
  - Search functionality
  - Submit new experience

#### `/interviews/submit`
- **Component**: `SubmitExperience.jsx`
- **Purpose**: Submit new interview experience
- **Features**:
  - Company selection
  - Role input
  - Experience details
  - Round information

#### `/interviews/:id`
- **Component**: `InterviewDetail.jsx`
- **Purpose**: Detailed interview experience
- **Features**:
  - Full experience view
  - Round breakdown
  - Author information
  - Share functionality

#### `/mentorship`
- **Component**: `MentorshipSessions.jsx`
- **Purpose**: Browse mentorship sessions
- **Features**:
  - Available sessions
  - Filter by mentor/company
  - Enrollment functionality
  - Payment integration

#### `/mentorship/mentor`
- **Component**: `MentorDashboard.jsx`
- **Purpose**: Mentor dashboard
- **Features**:
  - Create new sessions
  - Manage existing sessions
  - View enrollments
  - Session analytics

#### `/mentorship/:id`
- **Component**: `SessionDetail.jsx`
- **Purpose**: Session details
- **Features**:
  - Session information
  - Enrollment status
  - Payment processing
  - Meeting details

#### `/articles`
- **Component**: `Articles.jsx`
- **Purpose**: Technical articles
- **Features**:
  - Browse articles
  - Search functionality
  - Category filters
  - Author information

#### `/articles/submit`
- **Component**: `SubmitArticle.jsx`
- **Purpose**: Submit new article
- **Features**:
  - Article form
  - Medium link validation
  - Tags and categories
  - Author attribution

#### `/community`
- **Component**: `CommunityMeets.jsx`
- **Purpose**: Community discussions
- **Features**:
  - Browse meets
  - Filter by type
  - Join functionality
  - Host information

#### `/community/create`
- **Component**: `CreateMeet.jsx`
- **Purpose**: Create new meet
- **Features**:
  - Meet creation form
  - Type selection
  - Date and time
  - Meeting link

#### `/community/:id`
- **Component**: `MeetDetail.jsx`
- **Purpose**: Meet details
- **Features**:
  - Meet information
  - Participant list
  - Join/leave functionality
  - Host controls

## 🔐 Route Protection

### Authentication Guard
```javascript
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};
```

### Role-Based Protection
```javascript
const MentorRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState(null);
  
  useEffect(() => {
    // Fetch user role from Firestore
    if (currentUser) {
      // Check if user is mentor
    }
  }, [currentUser]);
  
  return userRole === 'mentor' ? children : <Navigate to="/mentorship" />;
};
```

## 📱 Responsive Navigation

### Mobile Navigation
- Hamburger menu for mobile
- Collapsible navigation
- Touch-friendly buttons
- Swipe gestures

### Desktop Navigation
- Horizontal navigation bar
- Dropdown menus
- Breadcrumb navigation
- Quick access buttons

## 🎯 Route Organization

### Feature-Based Grouping
```
/interviews/*     → Interview experience features
/mentorship/*     → Mentorship features
/articles/*       → Article features
/community/*      → Community features
```

### Resource-Based Grouping
```
/notes/*          → Learning resources
/cpp-stl-notes    → C++ STL resources
/dsa-pdf-notes    → DSA resources
/sql-notes        → SQL resources
```

## 🔄 Route Transitions

### Loading States
- Suspense boundaries for lazy loading
- Loading spinners during navigation
- Skeleton screens for content loading

### Error Boundaries
- 404 page for invalid routes
- Error pages for failed requests
- Graceful error handling

## 📊 Route Analytics

### Tracking
- Page view tracking
- User journey analysis
- Feature usage metrics
- Conversion tracking

### Performance
- Route load times
- Bundle size optimization
- Code splitting metrics
- Caching strategies

## 🛠️ Route Configuration

### App.jsx Structure
```javascript
<Router>
  <AuthProvider>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      
      {/* Feature Routes */}
      <Route path="/interviews" element={<PrivateRoute><InterviewExperiences /></PrivateRoute>} />
      <Route path="/mentorship" element={<PrivateRoute><MentorshipSessions /></PrivateRoute>} />
      
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  </AuthProvider>
</Router>
```

### Lazy Loading
```javascript
const InterviewExperiences = React.lazy(() => import('./features/interview/pages/InterviewExperiences'));
const MentorshipSessions = React.lazy(() => import('./features/mentorship/pages/MentorshipSessions'));
```

## 🎨 Route Styling

### Active Route Styling
- Highlight current route in navigation
- Breadcrumb styling
- Progress indicators

### Route-Specific Styling
- Feature-specific themes
- Custom layouts per route
- Responsive design per route

## 🔧 Route Utilities

### Navigation Helpers
```javascript
const useNavigation = () => {
  const navigate = useNavigate();
  
  const goToDashboard = () => navigate('/dashboard');
  const goToProfile = () => navigate('/profile');
  const goBack = () => navigate(-1);
  
  return { goToDashboard, goToProfile, goBack };
};
```

### Route Guards
```javascript
const useRouteGuard = (requiredRole) => {
  const { currentUser } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    // Check user permissions
  }, [currentUser, requiredRole]);
  
  return hasAccess;
};
``` 