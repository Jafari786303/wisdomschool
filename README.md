# Wisdom School

Wisdom School is a static Firebase-ready educational platform frontend built to keep hosting and database usage small on the Firebase free plan.

## Included Features

- A large, professional home and admissions page with school information and strong calls to action
- Student registration with name, email, phone number, address, grade, subjects, and course selection
- Teacher application with name, phone number, email, degree, teachable grades, and teachable subjects
- Designed submission alert for student admission requests
- Login area with Google auth, email and password, and username and password flows
- Dashboard with messenger, default school rooms, tasks, lessons, scores, and teacher student-selection tools
- Searchable chat creation by email or profile name
- Responsive layout for desktop and mobile

## Files

- `index.html`: platform structure and content
- `styles.css`: visual design and responsive layout
- `app.js`: local demo logic and Firebase-ready auth hooks
- `firebase-config.example.js`: copy to `firebase-config.js` and fill in your Firebase keys

## How To Use

1. Open the project with any static web server.
2. For demo mode, use the page as-is.
3. For Firebase mode, copy `firebase-config.example.js` to `firebase-config.js` and fill your real config.
4. Enable Google sign-in and Email/Password sign-in in Firebase Authentication.

## Demo Accounts

- `student@wisdom.school` with password `demo123`
- `teacher@wisdom.school` with password `demo123`
- `principal@wisdom.school` with password `demo123`
- `username` examples: `ayesha.rahman`, `sir.hamza`, `principal.amina`

## Minimal Firebase Plan

To keep usage small on the Firebase free plan:

- Store only lightweight user profiles in `users/{uid}`
- Keep one small mapping document per username in `usernames/{username}`
- Store chat room metadata in `rooms/{roomId}`
- Store messages in `rooms/{roomId}/messages/{messageId}` with pagination
- Store tasks, lessons, and scores as small subcollections per student
- Avoid storing large media files in Firebase Storage unless needed

Suggested user document shape:

```json
{
  "role": "student",
  "name": "Ayesha Rahman",
  "email": "student@wisdom.school",
  "username": "ayesha.rahman",
  "grade": "Grade 8",
  "courses": ["Mathematics", "Computer", "Tajweed"],
  "assignedTeacherIds": ["teacher-1"]
}
```

## Notes

- In demo mode the app stores data in browser `localStorage`.
- Google sign-in will stay in demo fallback mode until `firebase-config.js` is added.
- Username and password auth on Firebase should be implemented by resolving username to email from a lightweight lookup collection, then using Email/Password auth.
