Yes! Using **Express Router** is a clean way to modularize your route handling instead of putting everything into `app.js`. Here's how you can set it up step by step.

---

### ✅ Step-by-Step Setup Using Express Router

#### 1. **Project Structure (recommended)**

```
project/
│
├── app.js
├── routes/
│   ├── userRoutes.js
│   └── postRoutes.js
└── controllers/
    ├── userController.js
    └── postController.js
```

---

### ✅ 2. **app.js (Main Entry File)**

```js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(express.json());

// Use Routers
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

### ✅ 3. **routes/userRoutes.js**

```js
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/userController');

// GET /api/users
router.get('/', getAllUsers);

// POST /api/users
router.post('/', createUser);

module.exports = router;
```

---

### ✅ 4. **controllers/userController.js**

```js
exports.getAllUsers = (req, res) => {
  res.send('Get all users');
};

exports.createUser = (req, res) => {
  res.send('Create a user');
};
```

---

### ✅ 5. **Same Setup for Posts (Optional)**

#### **routes/postRoutes.js**

```js
const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../controllers/postController');

router.get('/', getAllPosts);

module.exports = router;
```

#### **controllers/postController.js**

```js
exports.getAllPosts = (req, res) => {
  res.send('Get all posts');
};
```

---

### 💡 Benefits of Using Express Router:

* Keeps your `app.js` clean and manageable.
* Better modularization (routes and logic separated).
* Easier to maintain and scale.
* Reusable route handlers via controller functions.

---
### 🍪 Express.js — Cookies (Reading & Writing)

Cookies in Express are small data items stored on the **client** and sent with every request. Useful for **sessions, auth, themes, etc.**

To use cookies easily in Express, use the **`cookie-parser`** middleware.

---

## ✅ Step-by-Step Setup

### 1. 📦 Install `cookie-parser`

```bash
npm install cookie-parser
```

---

### 2. ⚙️ In `app.js` — Setup Middleware

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser()); // enable cookie parsing
app.use(express.json());
```

---

### 3. 🍪 Setting a Cookie (on login or any route)

```js
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'lavanya', {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,         // JS can't access this cookie (for security)
  });
  res.send('Cookie has been set!');
});
```

---

### 4. 📖 Reading a Cookie

```js
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(`Cookie retrieved: ${username}`);
});
```

---

### 5. ❌ Deleting a Cookie

```js
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie cleared!');
});
```

---

## ⚠️ Notes:

* Cookies are **sent by the browser** automatically with every request.
* Cookies are **key-value pairs**.
* `httpOnly` ensures the cookie is **not accessible via JavaScript** (prevents XSS).
* You can also use `secure: true` for HTTPS-only cookies.

---

## ✅ Example Use Case: Auth Token in Cookie

```js
res.cookie('token', jwtToken, {
  httpOnly: true,
  maxAge: 86400000, // 1 day
});
```

---

