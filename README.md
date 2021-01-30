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
  * [Express.js](https://expressjs.com/fr/) : (Micro-)Framework qui fournit des outils pour faciliter le développement d'applications Node.js
  * [Mongoose](https://mongoosejs.com) : Bibliothèque pour des applications Node.js qui utilisent MongoDB
  * [Nodemon](https://nodemon.io) : Utilitaire qui permet de redémarrer l'application Node lors d'un changement dans le code
  * [Dotenv](https://www.npmjs.com/package/dotenv) : Module qui permet de charger des variables d'environnements de fichier **.env** en **process.env.** dans le code

* [MongoDB](https://www.mongodb.com/fr) : Base de données NoSQL orientée documents (pas de table comme MySQL)


## Installation

Ici se trouvent toutes les indications pour bien mettre en place notre environnement pour le projet.

### Premiers pas

Avant toutes choses vous devez installer NodeJS sur votre pc en allant sur le site : https://nodejs.org/fr/

Pour voir si NodeJS est bien installé vous pouvez aller sur une console (cmd sur Windows par exemple) et taper ```node -v``` qui va vous afficher la version de node sur votre pc (seulement si node est installé).

Pour la suite on va utiliser le gestionnaire de paquets de node qui est npm (npm est intégré à node). Comme pour NodeJS vous pouvez taper ```npm -v``` pour voir sa version.

On va installer des paquets dans notre projet (des dépendances) qui ne sont pas présentes dans github car trop volumineux.

Avant cela, télécharger les fichiers du github et mettez-les dans un dossier où vous souhaitez travailler (n'importe où sur votre pc).

Pour la suite vous aurez besoin d'aller sur une console et d'aller à l'adresse où se trouve la racine du projet (là où il y a le dossier *client* et *server*) :

```
cd C:/Chemin/PtutS4_Santee-main/Application/
```

Vous êtes maintenant pret pour installer les dépendances.

### Côté client

Le côté client (frontend) utilise la bibliothèque React qui utilise son lot de dépendances.

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


### Côté serveur

Le côté serveur (backend) utilise comme dépendances, express, mongoose, nodemon et dotenv que j'ai moi-même choisit d'installer (on peut très bien installer d'autres).

Accèdez au dossier server :
```
cd ..
cd server
```

Ensuite comme pour la partie client vous devez simplement faire la commande suivante :
```
npm install
```
(Cela va créer un dossier node_modules avec les dépendances à l'intérieur)

Félicitation, votre projet est pret à l'emploi !

Il suffit de faire dans votre console (n'oubliez pas qu'il faut être dans le dossier *server*) la commande suivante pour lancer le côté serveur du projet : ```npm start```

## Autre

### Remarques

 - Pour le code javascript merci de mettre des **;** à la fin de vos lignes. En effet, le code peut marcher sans (enfin ça peut dépendre) mais on s'y retrouve mieux avec. (Certaines personnes ne les utilisent pas dans les tutos, c'est pour ça que je précise)

 - **Attention :** L'utilisation de module de la version d'ES6 de js est utilisé au lieu de l'utilisation de CommonJS (Bibliothèque intégré à Node pour la gestion de modules), ainsi :
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