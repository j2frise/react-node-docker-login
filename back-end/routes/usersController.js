//imports
var bcrypt = require('bcryptjs');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");

//Routes
module.exports = {
  register: function(req, res){
      //get params
      var email = req.body.email;
      var password = req.body.password;
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;

      asyncLib.waterfall([
          function(done){
              //verify user exist
              models.User.findOne({
                  attributes: ['email'],
                  where: {email: email}
              })
              .then(function(userFound){
                  done(null, userFound);
              })
              .catch(function(error){
                  return res.status(500).json({'error': 'Erreur, Veuillez réessayer plus tard'});
              })
          },
          function(userFound, done){
              if(!userFound){
                  bcrypt.hash(password, 5, function(err, bcryptedPassword){
                      done(null, bcryptedPassword);
                  });
              } else {
                  return res.status(409).json({'error': 'Cet utilisateur existe déjà'});
              }
          },
          function(bcryptedPassword, done){
              models.User.create({
                  email: email,
                  pwd: bcryptedPassword,
                  firstname,
                  lastname
              })
              .then(function(newUser){
                  done(newUser);
              })
              .catch(function(err){
                  return res.status(500).json({'error': err+' ==> opération échouée'});
              });
          }
      ], function(newUser){
          if(newUser){            
            return res.status(201).json({'success': 'Compte créé avec succès'});
          } else {
            return res.status(500).json({'error': 'opération échouée'});
          }
      });
  },
  login: function(req, res){
    //get params
    var email = req.body.email;
    var password = req.body.password;
    asyncLib.waterfall([
        function(done) {
          models.User.findOne({
            where: { email: email }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({'error': 'impossible de vérifier l\'utilisateur, Veuillez réessayer plus tard'});
          });
        },
        function(userFound, done) {
          if (userFound) {
            bcrypt.compare(password, userFound.pwd, function(errBycrypt, resBycrypt) {
              done(null, userFound, resBycrypt);
            });
          } else {
            return res.status(404).json({'error': 'Cet utilisateur n\'existe pas'});
          }
        },
        function(userFound, resBycrypt, done) {
          if(resBycrypt) {
            done(userFound);
          } else {
            return res.status(403).json({'error': 'Mot de passe incorrect'});
          }
        }
      ], function(userFound) {
        if (userFound) {
          return res.status(201).json({'token': jwtUtils.generateToken(userFound)});
        } else {
            return res.status(500).json({'error': 'Erreur, Veuillez réessayer plus tard'});
        }
    });
  },
  getUser: function(req, res) {
    var headerAuth  = req.headers['authorization'];
    var token      = jwtUtils.getUserId(headerAuth);
    var userId      = req.params.id;

    if (token < 0){
      return res.status(400).json({ 'error': 'Mauvais jeton' });
    }

    if (!userId){
      return res.status(400).json({ 'error': 'paramètre userId manquant' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: { exclude: ['pwd'] },
          where: { id: userId }
        }).then(function(userFound) {
          done(userFound);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'impossible de récupérer l\'utilisateur' });
        });
      }, 
    ], function(userFound){
      if(userFound){
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({'error': 'opération échouée'});
      }
    });
  },
  getUsers: function(req, res) {
    var headerAuth  = req.headers['authorization'];
    var token      = jwtUtils.getUserId(headerAuth);

    if (token < 0){
      return res.status(400).json({ 'error': 'Mauvais jeton' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.finAll({
          attributes: { exclude: ['pwd'] }
        }).then(function(userFound) {
          done(userFound);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'impossible de récupérer l\'utilisateur' });
        });
      }, 
    ], function(userFound){
      if(userFound){
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({'error': 'opération échouée'});
      }
    });
  },
  connected: function(req, res) {
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    if (userId < 0){
      return res.status(400).json({ 'error': 'Mauvais jeton' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: { exclude: ['pwd'] },
          where: { id: userId }
        }).then(function(userFound) {
          done(userFound);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'impossible de récupérer l\'utilisateur' });
        });
      }, 
    ], function(userFound){
      if(userFound){
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({'error': 'opération échouée'});
      }
    });
  },
  logout: function(req, res){
    //get params
    var headerAuth  = req.headers['authorization'];
    let destroy = jwtUtils.destroyToken(headerAuth);
    return res.status(200).json(destroy);
  }
}