# Authentication Flow Documentation

## Overview
This document outlines the authentication system implementation in the Community Learning Platform using Firebase Auth.

## 🔐 Authentication Architecture

### Firebase Auth Integration
- **Provider**: Firebase Authentication
- **Methods**: Email/Password
- **State Management**: React Context
- **Persistence**: Firebase Auth persistence

### Authentication Context
```javascript
// contexts/AuthContext.jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
```

## 🔄 Authentication Flow

### 1. User Registration Flow
```
User visits /signup
    ↓
Fill registration form
    ↓
Form validation
    ↓
Create account with Firebase
    ↓
Create user profile in Firestore
    ↓
Redirect to /dashboard
```

### 2. User Login Flow
```
User visits /login
    ↓
Fill login form
    ↓
Form validation
    ↓
Authenticate with Firebase
    ↓
Load user data from Firestore
    ↓
Redirect to /dashboard
```

### 3. User Logout Flow
```
User clicks logout
    ↓
Sign out from Firebase
    ↓
Clear local state
    ↓
Redirect to /login
```

### 4. Protected Route Flow
```
User visits protected route
    ↓
Check authentication status
    ↓
If authenticated: Show component
    ↓
If not authenticated: Redirect to /login
```

## 📝 Implementation Details

### Signup Component
```javascript
const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const { user } = await signup(data.email, data.password);
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: data.name,
        createdAt: serverTimestamp(),
        role: 'student'
      });

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

### Login Component
```javascript
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

### Protected Route Component
```javascript
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
```

## 🔒 Security Features

### Form Validation
```javascript
const validationSchema = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters"
    }
  }
};
```

### Error Handling
```javascript
const handleAuthError = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'Email already registered';
    case 'auth/weak-password':
      return 'Password is too weak';
    default:
      return 'An error occurred during authentication';
  }
};
```

### Session Management
- Firebase handles session persistence
- Automatic token refresh
- Secure token storage
- Cross-tab synchronization

## 👤 User Profile Management

### User Data Structure
```javascript
// Firestore users collection
{
  uid: "user_id",
  email: "user@example.com",
  displayName: "John Doe",
  role: "student", // student, mentor, admin
  createdAt: "timestamp",
  lastLogin: "timestamp",
  profile: {
    bio: "Software engineering student",
    location: "New York",
    skills: ["JavaScript", "React", "Node.js"],
    experience: "2 years",
    education: "Computer Science",
    avatar: "https://...",
    socialLinks: {
      github: "https://github.com/...",
      linkedin: "https://linkedin.com/..."
    }
  },
  preferences: {
    notifications: true,
    emailUpdates: true,
    theme: "light" // light, dark, auto
  },
  progress: {
    dsaProblemsSolved: 45,
    totalProblems: 150,
    currentStreak: 7,
    longestStreak: 15
  }
}
```

### Profile Update Flow
```javascript
const updateProfile = async (profileData) => {
  try {
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      profile: profileData,
      updatedAt: serverTimestamp()
    });
    
    toast.success('Profile updated successfully!');
  } catch (error) {
    toast.error('Failed to update profile');
  }
};
```

## 🔐 Role-Based Access Control

### User Roles
- **Student**: Default role, can access all features
- **Mentor**: Can create mentorship sessions
- **Admin**: Full system access

### Role Checking
```javascript
const useUserRole = () => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchUserRole = async () => {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        setUserRole(userDoc.data()?.role || 'student');
      };
      fetchUserRole();
    }
  }, [currentUser]);

  return userRole;
};
```

### Role-Based Route Protection
```javascript
const MentorRoute = ({ children }) => {
  const userRole = useUserRole();
  
  if (userRole !== 'mentor') {
    return <Navigate to="/mentorship" />;
  }
  
  return children;
};
```

## 📱 Authentication UI/UX

### Loading States
```javascript
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  
  // Show loading spinner while checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return children;
};
```

### Success/Error Feedback
- Toast notifications for all auth actions
- Clear error messages
- Success confirmations
- Loading indicators during auth operations

### Form Design
- Clean, modern form design
- Real-time validation feedback
- Accessible form elements
- Mobile-responsive layout

## 🔄 Authentication State Management

### Global State
```javascript
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### State Updates
- Real-time auth state changes
- Automatic UI updates
- Cross-component synchronization
- Persistent login state

## 🛡️ Security Best Practices

### Password Security
- Minimum 6 characters
- No password requirements (Firebase handles)
- Secure password reset flow
- Account lockout protection

### Data Protection
- User data encrypted in Firestore
- Secure API calls
- HTTPS enforcement
- CORS protection

### Privacy Compliance
- GDPR compliance considerations
- Data retention policies
- User consent management
- Right to deletion

## 🔧 Authentication Utilities

### Password Reset
```javascript
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Password reset email sent!');
  } catch (error) {
    toast.error('Failed to send reset email');
  }
};
```

### Email Verification
```javascript
const sendEmailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success('Verification email sent!');
  } catch (error) {
    toast.error('Failed to send verification email');
  }
};
```

### Account Deletion
```javascript
const deleteAccount = async () => {
  try {
    // Delete user data from Firestore
    await deleteDoc(doc(db, 'users', currentUser.uid));
    
    // Delete Firebase account
    await deleteUser(currentUser);
    
    toast.success('Account deleted successfully');
    navigate('/login');
  } catch (error) {
    toast.error('Failed to delete account');
  }
};
```

## 📊 Authentication Analytics

### User Metrics
- Registration rate
- Login frequency
- Session duration
- Feature usage by authenticated users

### Security Metrics
- Failed login attempts
- Password reset requests
- Account deletion rate
- Security incident tracking

## 🚀 Deployment Considerations

### Environment Variables
```javascript
// .env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Production Security
- HTTPS enforcement
- Secure cookie settings
- CSP headers
- Rate limiting

### Monitoring
- Authentication error tracking
- User behavior analytics
- Security event logging
- Performance monitoring 