# Community Learning Platform — Full Stack

A comprehensive community learning platform where students can track DSA progress, access technical resources, share interview experiences, enroll in mentorship sessions, and participate in community discussions.

## 🚀 Features

### ✅ Already Implemented
- **DSA Progress Tracker**: Track progress through 150+ DSA problems with topic-wise organization
- **Resource Sharing**: Access curated technical learning resources and notes
- **User Authentication**: Firebase Auth with email/password
- **Profile Management**: User profiles with progress tracking

### 🆕 New Features
- **Interview Experience Sharing**: Submit and view company-specific interview experiences
- **Mentorship Sessions**: Book paid mentorship sessions with industry professionals
- **Technical Articles**: Share and discover technical articles
- **Community Conference**: Host and join community discussions and mock interviews
- **Payment Integration**: Stripe integration for mentorship session payments
- **Search & Filters**: Advanced search functionality across all features

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Payment**: Stripe
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── firebase/           # Firebase configuration
├── hooks/              # Custom React hooks
├── pages/              # Main application pages
├── features/           # Feature-specific modules
│   ├── interview/      # Interview experience features
│   ├── mentorship/     # Mentorship session features
│   ├── articles/       # Technical articles features
│   └── community/      # Community conference features
├── utils/              # Utility functions
└── data/              # Static data and constants
```

## 🔥 Firebase Collections

- `users`: User profiles and preferences
- `dsa_progress`: DSA problem tracking
- `interview_experiences`: Company interview experiences
- `mentorship_sessions`: Available mentorship sessions
- `mentorship_enrollments`: User enrollments in sessions
- `articles`: Technical articles
- `community_meets`: Community discussion sessions

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - Configure Firebase project
   - Set up Stripe account for payments
   - Add environment variables

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📚 Documentation

- [Project Structure](./docs/project-structure.md)
- [Feature Implementation Guide](./docs/feature-implementation-guide.md)
- [Routes Map](./docs/routes-map.md)
- [Authentication Flow](./docs/auth-flow.md)
- [Payment Flow](./docs/payment-flow.md)
- [Firestore Schema](./docs/firestore-schema.md)

## 🔐 Authentication Flow

1. User signs up/logs in via Firebase Auth
2. User data stored in Firestore
3. Protected routes require authentication
4. User context available throughout app

## 💳 Payment Flow (Mentorship)

1. Student browses available mentorship sessions
2. Clicks "Enroll" on desired session
3. Stripe payment modal opens
4. On successful payment:
   - Enrollment recorded in Firestore
   - Confirmation email sent
   - Session details provided

## 🔍 Search & Filters

- **Interview Experiences**: Filter by company name
- **Articles**: Search by title and description
- **Community Meets**: Filter by discussion type
- **Mentorship Sessions**: Filter by mentor, company, or topic

## 🎯 Key Features Breakdown

### Interview Experience Module
- Submit new interview experiences
- View all experiences with company filter
- Detailed experience pages with round information

### Mentorship Module
- Mentor dashboard for session management
- Student dashboard for session discovery
- Payment integration with Stripe
- Email notifications for enrollments

### Articles Module
- Submit technical articles with Medium links
- Browse articles with search functionality
- Author attribution and categorization

### Community Conference Module
- Create new discussion sessions
- Join existing sessions
- Filter by session type (Project, Mock Interview, Contest, Resume Review)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
