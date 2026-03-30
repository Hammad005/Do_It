Do It — React Native Todo App
=================================

A cross-platform React Native todo application with authentication and a simple Express/MongoDB backend.

Key features
------------

- Email/password authentication with OTP verification
- Create, edit, delete, and search todos
- Calendar integration and due dates
- Bottom-sheet UI for creating todos
- Remote API with JWT authentication and email notifications (Nodemailer)

Tech stack
----------

- Frontend: React Native (TypeScript), React Navigation, Redux Toolkit
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JSON Web Tokens (JWT), Nodemailer for email

Repository layout
-----------------

- `App/` — React Native app (main app code, package.json, scripts)
- `server/` — Express API (index.js, routes, controllers, model)
- `App/src/` — app source (screens, components, features)

Prerequisites
-------------

- Node.js (see `App/package.json` engines: v22+ recommended)
- npm or Yarn
- For Android: Android Studio + Android SDK
- For iOS: macOS with Xcode and CocoaPods
- MongoDB connection (local or hosted)

Environment variables (server)
------------------------------

Create a `.env` file in `server/` with at least:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Setup & run
-----------

1. Install and start the backend API

```sh
cd server
npm install
# create .env as above
npm run dev    # runs nodemon index.js
```

2. Install and run the React Native app

```sh
cd App
npm install
# Start Metro
npm start
# In a new terminal: run on Android or iOS
npm run android
# or (on macOS)
npm run ios
```

Notes
-----

- For iOS, run CocoaPods if required: `npx pod-install` or `cd ios && pod install`.
- The `App/package.json` includes scripts: `start`, `android`, `ios`, `lint`, `test`.
- The `server/package.json` includes `dev` (nodemon) and `start`.

Useful files
------------

- App entry: `App/App.tsx`
- Redux store: `App/store.js`
- API client: `App/services/axios.js`
- Server entry: `server/index.js`

Contributing
------------

- Open an issue or a PR describing the change you want to make.
- Keep code style consistent with existing files.
