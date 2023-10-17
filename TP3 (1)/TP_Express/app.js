const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configuration de MongoDB (remplacez par votre propre URI)
mongoose.connect('mongodb://127.0.0.1:27017/AppExpress', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuration de Passport.js
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware Express.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.set('view engine', 'pug');

// Routes
const authRoutes = require('./routes/auth');
app.use(authRoutes);

// Lancement du serveur
app.listen(3002
    , () => {
  console.log('Le serveur tourne sur le port 3001');
});
