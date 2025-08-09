# DSA Progress Tracker — Project Explanation

## 1. Project Overview
A full-stack community learning platform for tracking DSA progress, sharing interview experiences, booking mentorship sessions, reading technical articles, and joining community events. Built with React, Vite, Firebase (Auth & Firestore), Stripe, and TailwindCSS.

---

## 2. Tech Stack
- **Frontend:** React 18, Vite, TailwindCSS, React Router DOM
- **Backend:** Firebase Auth (authentication), Firestore (database)
- **Payments:** Stripe (mentorship sessions)
- **Forms:** React Hook Form
- **Notifications:** React Hot Toast

---

## 3. Main Features
### 3.1 DSA Progress Tracker
- Track progress on 150+ DSA problems, organized by topic.
- Progress saved per user in Firestore.
- Components: `OverallProgress`, `TopicProgress`, `ProgressBar`.
- Data: `src/data/dsaProblems.js` (problem list).

### 3.2 Interview Experience Sharing
- Submit, browse, and filter company-specific interview experiences.
- Components: `InterviewForm`, `InterviewList`, `InterviewDetail`, `InterviewFilter`.
- Data stored in Firestore (`interview_experiences` collection).
- Custom hook: `useInterviews`.

### 3.3 Mentorship Sessions
- Mentors create sessions; students browse and enroll.
- Stripe payment integration for paid sessions.
- Components: `SessionCard`, `SessionForm`, `PaymentModal`, `MentorDashboard`.
- Data: `mentorship_sessions` and `mentorship_enrollments` collections.
- Custom hook: `useMentorship`.

### 3.4 Technical Articles
- Submit and discover technical articles (with Medium links, tags, categories).
- Components: `ArticleCard`, `ArticleForm`, `ArticleSearch`.
- Data: `articles` collection in Firestore.
- Custom hook: `useArticles`.

### 3.5 Community Conference/Meets
- Create, browse, and join community events (mock interviews, contests, resume reviews).
- Components: `MeetCard`, `MeetForm`, `MeetFilter`, `JoinButton`.
- Data: `community_meets` collection in Firestore.
- Custom hook: `useCommunity`.

---

## 4. Project Structure
```
dsa-progress-tracker/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── contexts/     # Auth/payment context
│   ├── data/         # DSA problems, companies, topics
│   ├── features/     # Feature modules (interview, mentorship, articles, community)
│   ├── firebase/     # Firebase config
│   ├── hooks/        # Custom hooks (useProgress, useInterviews, etc.)
│   ├── pages/        # Main pages (Dashboard, Profile, Notes)
│   ├── utils/        # Utility functions
│   └── App.jsx, main.jsx, index.css, App.css
├── docs/             # Documentation
├── package.json      # Dependencies
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 5. Data Flow & Architecture
- **Authentication:** Firebase Auth, managed via `AuthContext`.
- **Progress Tracking:** Custom hook `useProgress` syncs user progress with Firestore.
- **Feature Data:** Each feature uses its own custom hook to interact with Firestore collections.
- **Payments:** Stripe modal for mentorship session enrollment; payment status tracked in Firestore.
- **Real-time Updates:** Firestore listeners for live data sync.
- **Routing:** React Router for navigation and protected routes.

---

## 6. UI/UX & Design Principles
- Mobile-first, responsive layouts (TailwindCSS)
- Consistent card, form, and navigation design
- Loading and error states for all async operations
- Toast notifications for feedback
- Role-based access and protected routes

---

## 7. Security & Privacy
- Firestore security rules for each collection
- Protected routes for sensitive pages
- Input validation (client: react-hook-form, server: Firestore rules)
- Stripe for secure payments
- User data privacy and GDPR considerations

---

## 8. Testing & Performance
- Unit and integration tests (React Testing Library, Jest)
- E2E tests for user journeys
- Code splitting and lazy loading for performance
- Pagination and caching for large datasets

---

## 9. Deployment & Environment
- Firebase Hosting for deployment
- Environment variables for Firebase and Stripe keys
- Build optimization with Vite
- Monitoring: error tracking, analytics

---

## 10. References & Documentation
- [Project Structure](./docs/project-structure.md)
- [Feature Implementation Guide](./docs/feature-implementation-guide.md)
- [Firestore Schema](./docs/firestore-schema.md)
- [Authentication Flow](./docs/auth-flow.md)
- [Payment Flow](./docs/payment-flow.md)

---

## 11. Contributing
- Fork, branch, commit, and pull request workflow
- MIT License

---

## 12. Summary
This project is a scalable, modular platform for DSA learners and job seekers, with robust features for progress tracking, community engagement, and real-world preparation. All data is securely managed in Firebase, and the UI is designed for clarity and responsiveness.
