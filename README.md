# Projet tutoré de S4 : Carnet de santé numérique

Projet d'un carnet de santé numérique.

## Présentation

L'utilisateur peut se fixer des objectifs et les remplir lui ferait gagner de l'expérience et débloquer des succès.
Il est donc possible de gagner ses badges et de l'expérience en faisant des dons du sang, etc...

Le carnet propose un suivis des vaccins, dons de sang, maladies, rappels de médicaments, règles, cycles de sommeil, etc...


## Technologies et outils utilisés

* [React](https://fr.reactjs.org) : Bibliothèque js pour la partie Front End/Client
  * [React Router](https://reactrouter.com) : Bibliothèque de routage des urls (Permet de charger des composants en fonction de l'URL)

* [Node.js](https://nodejs.org/fr/) : Environnement d'éxécution qui permet d'utiliser du js côté serveur
  * [npm](https://www.npmjs.com) : Gestionnaire de paquets de Node.js (installé automatiquement avec Node.js)
  * [Express.js](https://expressjs.com/fr/) : Framework qui fournit des outils pour faciliter le développement d'applications Node.js
  * [Mongoose](https://mongoosejs.com) : Bibliothèque pour des applications Node.js qui utilisent MongoDB
  * **(petit paquet)** [Nodemon](https://nodemon.io) : Utilitaire qui permet de redémarrer l'application Node lors d'un changement dans le code
  * **(petit paquet)** [Dotenv](https://www.npmjs.com/package/dotenv) : Module qui permet de charger des variables d'environnements de fichier **.env** en **process.env.** dans le code
  * **(petit paquet)** [validator](https://www.npmjs.com/package/validator) : Bibliothèque pour valider des string (par exemple des mails)
  * **(petit paquet)** [bcrypt](https://www.npmjs.com/package/bcrypt) : Bibliothèque qui pour hash des mots de passe
  * [JWT](https://jwt.io) : JSON Web Token utilise des tokens pour échanger des informations entre plusieurs tiers. Par exemple pour s'authentifier.
  * **(petit paquet)** [cookie-parser](https://www.npmjs.com/package/cookie-parser) : Permet de lire les cookies de notre application

* [MongoDB](https://www.mongodb.com/fr) : Base de données NoSQL orientée documents (pas de table comme MySQL)


## Installation

Ici se trouvent toutes les indications pour bien mettre en place notre environnement pour le projet.

### Premiers pas

Avant toutes choses vous devez installer NodeJS sur votre pc en allant sur le site : https://nodejs.org/fr/

Pour voir si NodeJS est bien installé vous pouvez aller sur une console (cmd sur Windows par exemple) et taper ```node -v``` qui va vous afficher la version de node sur votre pc (seulement si node est installé).

Pour la suite on va utiliser le gestionnaire de paquets de node qui est npm (npm est intégré à node). Comme pour NodeJS vous pouvez taper ```npm -v``` pour voir sa version.

On va installer des paquets dans notre projet (des dépendances) grâce à npm. Ces paquets ne sont pas présents dans github car trop volumineux.

Avant cela, télécharger les fichiers du github et mettez-les dans un dossier où vous souhaitez travailler (n'importe où sur votre pc).

Pour la suite vous aurez besoin d'aller sur une console et d'aller à l'adresse où se trouve la racine du projet (là où il y a le dossier *client* et *server*) :

```
cd C:/Chemin/PtutS4_Santee-main/Application/
```

Vous êtes maintenant prêt pour installer les dépendances.

### Côté client

Le côté client (frontend) utilise la bibliothèque React qui utilise son lot de dépendances (+ React Router).

Accèdez au dossier client :
```
cd client
```

Ensuite pour installer les dépendances vous avez simplement à faire la commande suivante :
```
npm install
```
(Cela va créer un dossier node_modules avec les dépendances à l'intérieur)

Une fois le téléchargement fini vous êtes prêt à coder la partie client.

Il suffit de faire dans votre console (n'oubliez pas qu'il faut être dans le dossier *client*) la commande suivante pour lancer le côté client du projet : ```npm start```

Pour arreter le script vous pouvez soit fermer la console ou alors faire ```Ctrl+C```


### Côté serveur

Le côté serveur (backend) utilise comme dépendances, express, mongoose, nodemon, dotenv... (voir la liste) que j'ai moi-même choisit d'installer (on peut très bien en installer d'autres).

Accèdez au dossier server :
```
cd ..
cd server
```

Ensuite comme pour la partie client vous devez simplement faire la commande suivante pour installer les dépendances citées plus haut :
```
npm install
```
(Cela va créer un dossier node_modules avec les dépendances à l'intérieur)

*Remarque : le paquet dotenv utilise un fichier .env (sans rien devant le point) que vous devez créer dans la racine du serveur (plus d'infos dans la partie Autre>Remarques>Fichier .env)*

Félicitation, votre projet est prêt à l'emploi !

Il suffit de faire dans votre console (n'oubliez pas qu'il faut être dans le dossier *server*) la commande suivante pour lancer le côté serveur du projet : ```npm start```

Pour arreter le script vous pouvez soit fermer la console ou alors faire ```Ctrl+C```

#### Base de données

Pour pouvoir faciliter la manipulation de la base de données, vous pouvez installer [MongoDB Compass](https://www.mongodb.com/products/compass) (Téléchargez le en .msi) qui est un GUI pour visualiser les données, ceci dit, ce n'est pas du tout obligatoire.
Lien pour se connecter à la bdd : *mongodb+srv://ptuts4user:bdd-santex@cluster0.xyttr.mongodb.net/ptuts4-project*

On peut aussi installer [Postman](https://www.postman.com/downloads/) pour pouvoir simuler des requêtes du client vers la partie server sans forcément avoir besoin de codé le client, mais encore une fois, c'est facultatif.

## Autre

### Remarques

#### Point virgule
Pour le code Javascript merci de mettre des **;** à la fin de vos lignes. En effet, le code peut marcher sans (enfin ça peut dépendre) mais on s'y retrouve mieux avec. (Certaines personnes ne les utilisent pas dans les tutos, c'est pour ça que je précise)

#### Modules ES6
**Attention :** L'utilisation de module de la version d'ES6 de js est utilisé au lieu de l'utilisation de CommonJS (Bibliothèque intégré à Node pour la gestion de modules), ainsi :
```javascript
/*Pour Import*/
//On n'utilise pas :
let moduleVarImp = require("dossier/module");
//Mais :
import moduleVarImp from "dossier/module";

/*Pour Export*/
let ModuleVarExp = "test";

//On n'utilise pas :
module.exports = ModuleVarExp;
//Mais :
export {ModuleVarExp};
//Ou :
export default ModuleVarExp; //On ne peut utiliser le export default qu'une fois dans un document
```

#### Fichier .env
**Important :** Du côté serveur, le paquet dotenv a été installé ce qui permet d'avoir des variables d'environnement, ainsi il faut créer un fichier *.env* (sans rien devant le point) dans le dossier *server* (à la racine de ce dossier). Pour l'instant le fichier est sous la forme :
```
PORT=5000
DB_USER_PASS=ptuts4user:bdd-santex
```
Vous pouvez utiliser une variable dans un autre fichier de cette manière : (C'est un exemple)
```javascript
let port = process.env.PORT;
```