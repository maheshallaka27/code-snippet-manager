### DAY 1:

basic setup folder structure and installed necessary packages

### DAY 2:

connected mongoDB atlas
created .env file
created models User.js,Snippet.js,Collection.js,Version.js
tested mongoDB connection

database relationship:

User
│
├───────────────┐
│ │
Snippet Collection
│
│
Version

more clearly:

User (1)
│
├─────────< Snippet (Many)
│ │
│ ├────< Version (Many)
│
└─────────< Collection (Many)

### Day 3:

## ✅ Completed

### Authentication

- Implemented user registration API (`POST /api/auth/register`)
- Implemented user login API (`POST /api/auth/login`)
- Implemented user profile API (`GET /api/auth/profile`)

### Security

- Password hashing using `bcrypt`
- JWT generation using `jsonwebtoken`
- JWT authentication middleware (`protect`)
- Protected profile route using middleware

### Validation

- Required field validation
- Email format validation using `validator`
- Password length validation
- Duplicate email check during registration

### Authorization

- Verified JWT from the `Authorization` header
- Retrieved authenticated user from the database
- Attached authenticated user to `req.user`
- Excluded password from returned user data

### API Testing

- Successfully tested Register API
- Successfully tested Login API
- Successfully tested Protected Profile API using Bearer Token

# Day 4 - Snippet CRUD

## ✅ Completed

### Snippet APIs

- Implemented Create Snippet API
- Implemented Get All Snippets API
- Implemented Get Snippet By ID API
- Implemented Update Snippet API
- Implemented Delete Snippet API

### Authorization

- Protected all snippet routes using JWT middleware
- Restricted users to access only their own snippets
- Used authenticated user ID (`req.user._id`) for ownership verification

### Database Operations

- Learned and used Mongoose CRUD methods:
  - create()
  - find()
  - findOne()
  - findOneAndUpdate()
  - findOneAndDelete()

### API Testing

- Successfully tested all CRUD endpoints using Postman
- Verified authentication and authorization behavior

---

## 📚 Concepts Learned

- CRUD API design
- Route parameters (`req.params`)
- Resource ownership
- Mongoose query filters
- Updating documents with validation
- Deleting documents securely
- RESTful API conventions

---

## 🎯 Outcome

Completed the core backend CRUD functionality for the AI Code Snippet Manager. Users can now securely create, view, update, and delete their own code snippets.

# Day 5 - Search, Filters & Favorites

## ✅ Completed

### Search API

- Implemented search snippets endpoint
- Added search by title, description and code
- Used MongoDB `$regex` for partial matching
- Used `$or` to search across multiple fields
- Implemented case-insensitive search

### Language Filter

- Implemented filter by programming language
- Used query parameters
- Added validation
- Implemented case-insensitive filtering

### Tag Filter

- Implemented filter by tags
- Learned MongoDB `$in`
- Normalized tags before storing
- Implemented case-insensitive tag search

### Favorite Feature

- Implemented toggle favorite endpoint
- Learned PATCH requests
- Updated boolean values using `!`
- Saved updated documents using `.save()`

---

## 📚 Concepts Learned

- req.query
- Query parameters
- MongoDB operators
  - $or
  - $regex
  - $options
  - $in
- PATCH requests
- Boolean toggling
- Data normalization
- Search APIs
- Filtering APIs

---

## 🎯 Outcome

Backend now supports advanced searching, filtering and favorite management for snippets.

# Day 6 Progress - Public Snippets & Analytics

## Features Implemented

### 1. Public / Private Snippets

- Added `togglePublicVisibility` controller.
- Users can switch a snippet between public and private.
- Only the owner of the snippet can change its visibility.
- Implemented using a boolean toggle (`isPublic = !isPublic`).

### 2. Get Public Snippets

- Created an endpoint to fetch all public snippets.
- Sorted snippets by newest first using `createdAt`.
- Used Mongoose `populate()` to include owner's `name` and `email`.
- This route is accessible without authentication.

### 3. View Counter

- Added `viewCount` field to the Snippet model.
- Implemented an endpoint to increment the view count of public snippets.
- Used MongoDB `$inc` operator for atomic updates.

### 4. Copy Counter

- Added `copyCount` field to the Snippet model.
- Implemented an endpoint to increment the copy count of public snippets.
- Used MongoDB `$inc` operator.

## New Concepts Learned

- Difference between `findByIdAndUpdate()` and `findOneAndUpdate()`.
- MongoDB `$inc` operator for incrementing numeric fields.
- Mongoose `populate()` for retrieving referenced documents.
- Difference between public and protected API routes.
- Why route order is important in Express (`/public` before `/:id`).

## Testing

Successfully tested:

- Toggle Public API
- Get Public Snippets API
- Increment View Count API
- Increment Copy Count API

## Important Design Decision

The following routes were intentionally kept **without the `protect` middleware**:

- `GET /api/snippets/public`
- `PATCH /api/snippets/:id/view`
- `PATCH /api/snippets/:id/copy`

Reason:
These endpoints are meant for **public snippets**. Any visitor should be able to view or copy a public snippet, even without logging in. The controllers themselves ensure that only snippets with `isPublic: true` are accessible or updated.

## Status

✅ Day 6 Completed Successfully
