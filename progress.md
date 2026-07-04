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
