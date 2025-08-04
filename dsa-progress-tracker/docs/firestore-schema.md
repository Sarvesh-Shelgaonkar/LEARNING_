# Firestore Schema Documentation

## Overview
This document describes the Firestore collections and document structures for all major features in the Community Learning Platform.

---

## 🔑 Users Collection

### Collection: `users`
```json
{
  "uid": "user_id",
  "email": "user@example.com",
  "displayName": "John Doe",
  "role": "student", // student, mentor, admin
  "createdAt": "timestamp",
  "lastLogin": "timestamp",
  "profile": {
    "bio": "Software engineering student",
    "location": "New York",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": "2 years",
    "education": "Computer Science",
    "avatar": "https://...",
    "socialLinks": {
      "github": "https://github.com/...",
      "linkedin": "https://linkedin.com/..."
    }
  },
  "preferences": {
    "notifications": true,
    "emailUpdates": true,
    "theme": "light"
  },
  "progress": {
    "dsaProblemsSolved": 45,
    "totalProblems": 150,
    "currentStreak": 7,
    "longestStreak": 15
  }
}
```

---

## 📚 DSA Progress Collection

### Collection: `dsa_progress`
```json
{
  "userId": "user_id",
  "topic": "Arrays",
  "problemsSolved": 10,
  "totalProblems": 20,
  "lastUpdated": "timestamp"
}
```

---

## 📝 Interview Experiences Collection

### Collection: `interview_experiences`
```json
{
  "companyName": "Google",
  "role": "Software Engineer",
  "experience": "Detailed interview experience...",
  "roundDetails": [
    {
      "round": "Technical Round 1",
      "questions": ["Question 1", "Question 2"],
      "difficulty": "Medium",
      "feedback": "Positive feedback..."
    }
  ],
  "submittedBy": "user_id",
  "submittedByEmail": "user@example.com",
  "date": "2024-01-15",
  "createdAt": "timestamp"
}
```

---

## 🎓 Mentorship Sessions Collection

### Collection: `mentorship_sessions`
```json
{
  "mentorName": "John Doe",
  "mentorEmail": "john@example.com",
  "company": "Google",
  "techStack": ["React", "Node.js"],
  "topic": "System Design",
  "description": "Learn system design concepts...",
  "date": "2024-02-15T10:00:00Z",
  "duration": 60,
  "price": 50.00,
  "meetingLink": "https://meet.google.com/...",
  "maxParticipants": 5,
  "currentParticipants": 2,
  "status": "upcoming",
  "createdAt": "timestamp"
}
```

### Collection: `mentorship_enrollments`
```json
{
  "sessionId": "session_id",
  "userId": "user_id",
  "userEmail": "student@example.com",
  "paymentStatus": "completed",
  "paymentId": "stripe_payment_id",
  "enrolledAt": "timestamp"
}
```

---

## 📖 Articles Collection

### Collection: `articles`
```json
{
  "title": "Advanced React Patterns",
  "description": "Learn advanced React patterns...",
  "mediumLink": "https://medium.com/...",
  "author": "Jane Smith",
  "authorEmail": "jane@example.com",
  "tags": ["React", "JavaScript", "Frontend"],
  "category": "Frontend Development",
  "readTime": 8,
  "publishedAt": "2024-01-10",
  "createdAt": "timestamp"
}
```

---

## 🏛️ Community Meets Collection

### Collection: `community_meets`
```json
{
  "host": "Alice Johnson",
  "hostEmail": "alice@example.com",
  "topicType": "Mock Interview",
  "title": "Google Mock Interview",
  "description": "Practice Google-style interviews...",
  "techStack": ["Algorithms", "System Design"],
  "meetingLink": "https://meet.google.com/...",
  "date": "2024-02-20T15:00:00Z",
  "duration": 90,
  "maxParticipants": 10,
  "currentParticipants": 5,
  "participants": ["user1", "user2", "user3"],
  "status": "upcoming",
  "createdAt": "timestamp"
}
```

---

## 🔒 Security Rules (Sample)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /interview_experiences/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /mentorship_sessions/{docId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'mentor';
    }
    match /mentorship_enrollments/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /articles/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /community_meets/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
``` 