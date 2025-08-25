# BlogBook

This project is a fully secure blogging platform designed to provide users with a safe and personalized experience. Users can create an account, log in, and access a collection of blog posts tailored for authenticated members. The platform uses hashed passwords for authentication, ensuring that user credentials are never stored in plain text and are protected from potential security breaches.

Only registered and logged-in users can view the blog content, adding an extra layer of privacy and security to the platform. This approach guarantees that sensitive or private posts remain inaccessible to unauthorized visitors. The project demonstrates best practices in web application security, including user authentication, password hashing, and access control. Additionally, the interface is designed to be user-friendly, allowing smooth navigation through registration, login, and content browsing.

This project not only showcases a functional blogging system but also emphasizes the importance of secure user management and protected content in modern web development.

## Installation

git clone (repo link)

### Backend

Go to api foldere and run 

```
npm ci
```

Run Xampp and run MySQL and Apache server.  
Open phpMyAdmin and create a database called: api-integration  
Run SQL script called db.sql  
Go to api folder and run:

```
node index.js
```

### Frontend

Go to root folder and run:

```
nmp ci
npm run dev
```
