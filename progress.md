DAY 1:

basic setup folder structure and installed necessary packages

DAY 2:

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

Day 3:
