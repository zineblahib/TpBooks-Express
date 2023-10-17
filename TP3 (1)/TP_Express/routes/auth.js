// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Page d'inscription
router.get('/register', (req, res) => {
  res.render('register');
});

// Gestion de l'inscription
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.error(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/login');
    });
  });
});

// Page de connexion
router.get('/login', (req, res) => {
  res.render('login');
});

// Gestion de la connexion
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books/create',
  failureRedirect: '/login'
}));

// Déconnexion
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
/** 
// Page des livres (ajoutée)
router.get('/books', (req, res) => {
  if (req.isAuthenticated()) {
    console.log("bonjour")
    // Ajoutez ici la logique pour afficher la page des livres
    // Récupérez les livres depuis MongoDB, puis utilisez res.render pour les afficher
  } else {
    res.redirect('/login'); // Redirigez les utilisateurs non authentifiés vers la page de connexion
  }
});
*/
// Ajouter une route pour afficher le formulaire de création de livres
router.get('/books/create', (req, res) => {
    if (req.isAuthenticated()) {
      res.render('books');
    } else {
      res.redirect('/login');
    }
  });

 /** 
  // Ajouter une route pour gérer la soumission du formulaire de création de livres
  router.post('/books/create', (req, res) => {
    if (req.isAuthenticated()) {
      // Récupérez les données du formulaire
      const title = req.body.title;
      const author = req.body.author;
  
      // Enregistrez les données dans la base de données (à adapter à votre modèle de données)
      // Par exemple, si vous utilisez Mongoose pour MongoDB :
      const Book = require('../models/book');
  
      const newBook = new Book({ title, author });
  
      newBook.save((err) => {
        if (err) {
          console.error(err);
          // Gérez les erreurs ici
        } else {
          // Redirigez l'utilisateur vers la page des livres après l'ajout
          res.redirect('/books');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
  
*/ 
// Importez le modèle de données "Book"
const Book = require('../models/book');

// ...

// Créez une variable pour stocker les livres (array)
const booksList = [];

// Ajouter une route pour gérer la soumission du formulaire de création de livres
router.post('/books/create', (req, res) => {
  if (req.isAuthenticated()) {
    // Récupérez les données du formulaire
    const title = req.body.title;
    const author = req.body.author;

    // Créez un objet pour le nouveau livre
    const newBook = { title, author };

    // Ajoutez le nouveau livre à la liste
    booksList.push(newBook);

    // Redirigez l'utilisateur vers la page des livres après l'ajout
    res.redirect('/books/all');
  } else {
    res.redirect('/login');
  }
});

// ...

// Ajoutez cette route après la route `/books/create`
router.get('/books/all', (req, res) => {
  if (req.isAuthenticated()) {
    // Affichez la liste des livres dans une vue (par exemple, allbooks.pug)
    res.render('allbooks', { books: booksList });
  } else {
    res.redirect('/login');
  }
});

// ...

  
module.exports = router;

