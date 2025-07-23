npm init -y
npm i express
npm i ejs
npm i mongoose

Here are **short revision notes** for all MongoDB and Mongoose topics you've listed. Each is explained in **simple terms**, ideal for revision:

---

### 💻 **MongoDB Basics**

#### 1. **The Mongo Shell**

* A CLI to interact with MongoDB database.
* Use commands like `show dbs`, `use dbname`, `db.collection.find()`.

#### 2. **How we store data? (BSON)**

* Data is stored in **BSON**: Binary JSON (faster & supports extra types like Date, ObjectId).
* Example: `{ name: "Lavanya", age: 21 }`

#### 3. **Document & Collection**

* **Document**: A single record (like a JS object).
* **Collection**: A group of documents (like a table).
* Example:

  ```json
  // Document
  { name: "Quora", type: "Q&A" }
  // Collection name: posts
  ```

#### 4. **INSERT in DB**

* **InsertOne**:

  ```js
  db.users.insertOne({ name: "Amit", age: 24 });
  ```
* **InsertMany**:

  ```js
  db.users.insertMany([{ name: "A" }, { name: "B" }]);
  ```

#### 5. **FIND in DB**

* `db.users.find()` — returns all.
* `db.users.find({ name: "Amit" })` — query specific.

#### 6. **Query Operators**

* `$gt`, `$lt`, `$in`, `$and`, `$or`
* Example: `db.users.find({ age: { $gt: 20 } })`

#### 7. **UPDATE in DB**

* `updateOne()`, `updateMany()`
* Example:

  ```js
  db.users.updateOne({ name: "Amit" }, { $set: { age: 25 } });
  ```

#### 8. **Nesting**

* Documents can have nested objects:

  ```json
  { name: "Amit", address: { city: "Pune", pin: 411001 } }
  ```

#### 9. **DELETE in DB**

* `deleteOne()` and `deleteMany()`

  ```js
  db.users.deleteOne({ name: "Amit" });
  ```

---

### 🛠️ **Mongoose Basics (MongoDB + Node.js ODM)**

#### 1. **What is Mongoose?**

* ODM = Object Data Modeling library for MongoDB in Node.js.
* Helps define **schemas**, validate data, and manage MongoDB easier.

#### 2. **Installation & Setup**

```bash
npm install mongoose
```

```js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");
```

#### 3. **Schema**

* Blueprint of a document.

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});
```

#### 4. **Models**

* Connects schema to a collection.

```js
const User = mongoose.model("User", userSchema);
```

#### 5. **Insert in Mongoose**

```js
const user = new User({ name: "Lavanya", age: 21 });
user.save();
```

#### 6. **Insert Multiple**

```js
User.insertMany([
  { name: "A" },
  { name: "B" }
]);
```

#### 7. **Find in Mongoose**

```js
User.find(); // All users
User.find({ name: "A" }); // Filtered
```

#### 8. **Update in Mongoose**

```js
User.updateOne({ name: "A" }, { $set: { age: 30 } });
```

#### 9. **FindAndUpdate**

```js
User.findOneAndUpdate({ name: "A" }, { age: 22 }, { new: true });
```

#### 10. **Delete in Mongoose**

```js
User.deleteOne({ name: "A" });
User.findOneAndDelete({ name: "A" });
```

---

### ✅ **Schema Validations & Options**

#### 11. **Schema Validations**

Add rules to ensure data correctness:

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18 }
});
```

#### 12. **SchemaType Options**

* `required`, `min`, `max`, `enum`, `default`, `unique`

```js
email: { type: String, required: true, unique: true }
```

#### 13. **Validation in Update & Error Handling**

* By default, validations are off in update. Turn it on:

```js
User.updateOne({}, {}, { runValidators: true });
```

* Catch errors:

```js
user.save().catch(err => console.log(err.message));
```

---

Would you like me to generate sample code for a full **Mongoose + Express** CRUD app too?





Here’s a **very simple Express + Mongoose CRUD app** with EJS views for managing posts, following your MongoDB learning path.

---

## 🔧 Setup

### 1. **Install dependencies:**

```bash
npm init -y
npm install express mongoose ejs body-parser
```

### 2. **Project structure:**

```
project/
│
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   └── edit.ejs
│
├── models/
│   └── Post.js
│
├── app.js
```

---

## 📄 `models/Post.js` – Mongoose schema

```js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Post', postSchema);
```

---

## 📄 `app.js` – Main server file

```js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// 🟢 ROUTES

// Show all posts
app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', { posts });
});

// Form to create new post
app.get('/new', (req, res) => {
    res.render('new');
});

// Create post
app.post('/create', async (req, res) => {
    const { title, content } = req.body;
    await Post.create({ title, content });
    res.redirect('/');
});

// Edit form
app.get('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post });
});

// Update post
app.post('/update/:id', async (req, res) => {
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect('/');
});

// Delete post
app.post('/delete/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

---

## 📄 `views/index.ejs` – Show all posts

```html
<h1>All Posts</h1>
<a href="/new">Create New</a>
<ul>
  <% posts.forEach(post => { %>
    <li>
      <h3><%= post.title %></h3>
      <p><%= post.content %></p>
      <a href="/edit/<%= post._id %>">Edit</a>
      <form action="/delete/<%= post._id %>" method="POST">
        <button>Delete</button>
      </form>
    </li>
  <% }) %>
</ul>
```

---

## 📄 `views/new.ejs` – Create form

```html
<h2>New Post</h2>
<form action="/create" method="POST">
  <input name="title" placeholder="Title" required>
  <textarea name="content" placeholder="Content" required></textarea>
  <button type="submit">Create</button>
</form>
<a href="/">Back</a>
```

---

## 📄 `views/edit.ejs` – Edit form

```html
<h2>Edit Post</h2>
<form action="/update/<%= post._id %>" method="POST">
  <input name="title" value="<%= post.title %>" required>
  <textarea name="content" required><%= post.content %></textarea>
  <button type="submit">Update</button>
</form>
<a href="/">Back</a>
```

---

## ✅ Result

You now have a working Express + MongoDB CRUD app using EJS templates.

Let me know if you want:

* REST API version (without EJS)
* Validation messages
* Auth added
* Or frontend in React instead of EJS.



Here’s a complete **flow of working in Express CRUD App (using MongoDB + Mongoose)** with **sample data** and simple explanation of each step.

---

### 🌐 OVERALL FLOW

```
Client (Browser/Form) ⇄ Express Server ⇄ MongoDB (via Mongoose)
```

---

### ✅ STEP-BY-STEP FLOW (CRUD)

Let’s assume we are creating a simple **Blog Post App** with:

```json
{
  "title": "Learn Express",
  "content": "Express is a Node.js framework for backend."
}
```

#### 1. **CREATE (POST request)**

* **Client Side:**
  A form submits data (title, content) via POST.

* **Express Route:**
  `app.post('/posts', ...)`
  Receives data using `req.body`, validates, then creates document.

* **Mongoose:**
  Uses `Post.create(req.body)` to save in MongoDB.

* **MongoDB:**
  Stores data in a `posts` collection.

---

#### 2. **READ (GET request)**

* **Client:**
  User visits `/posts` or `/posts/:id`.

* **Express Route:**
  `app.get('/posts')` or `app.get('/posts/:id')`
  Fetches from MongoDB via `Post.find()` or `Post.findById()`.

* **Mongoose:**
  Interacts with DB and returns data.

* **Render with EJS:**
  Data passed to `.render('index', { posts })`.

---

#### 3. **UPDATE (PUT or POST as workaround)**

* **Client Side:**
  A form submits new data for existing post.

* **Express Route:**
  `app.post('/posts/:id/edit')` or `app.put('/posts/:id')`

* **Mongoose:**
  `Post.findByIdAndUpdate(id, newData)`

* **MongoDB:**
  Updates existing document.

---

#### 4. **DELETE (POST or DELETE)**

* **Client Side:**
  A button sends request to delete post.

* **Express Route:**
  `app.post('/posts/:id/delete')`

* **Mongoose:**
  `Post.findByIdAndDelete(id)`

* **MongoDB:**
  Removes document.

---

### 📝 SAMPLE DATA IN MONGODB

```json
{
  "_id": "64f123abc...",
  "title": "Intro to Express",
  "content": "Express helps create backend servers easily.",
  "createdAt": "2025-07-23T08:00:00.000Z"
}
```

---

### ⚙️ SAMPLE EJS FILE (index.ejs)

```ejs
<h1>All Posts</h1>
<% posts.forEach(post => { %>
  <h2><%= post.title %></h2>
  <p><%= post.content %></p>
<% }) %>
```

---

