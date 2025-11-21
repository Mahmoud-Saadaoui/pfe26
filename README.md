# Projet : Gestion des Interventions Juridiques
Application web permettant la gestion des interventions juridiques au sein d’un système multi-rôles.

## ✨ 1. Présentation générale

Ce projet a été réalisé en collaboration avec :
* Saadaoui Mahmoud — ( contact.saadaouimahmoud@gmail.com)
* Haythem Harrabi — ( harrabihaithem21@gmail.com)
* Amira Haj Boubaker Rais — (amira.hajboubakerrais@gmail.com)

Nous avons travaillé à partir d’un cahier des charges précis, en respectant une séparation claire entre le frontend et le backend.
L’ensemble du travail a été coordonné via GitHub, notamment pour :
* la gestion des branches
* les pull requests et revues de code

L’application permet :
* La gestion des communes, thèmes, utilisateurs et interventions
* Une authentification sécurisée via JWT
* Le rôle Administrateur
* Le rôle Agent/Juriste
* Un tableau de bord statistique 

## 🧱 2. Stack technologique utilisée
### 🔵 Backend
* Node.js
* Express.js
* Prisma ORM
* JWT
* bcrypt

## 🟢 Frontend
* React.js
* TailwindCSS
* TanStack Query
* React Router v6
* Axios

### 🟣 Base de données
* MySQL + Prisma

## 🔐 4. Rôles & Permissions
### 👑 Administrateur
* CRUD Communes
* CRUD Thèmes
* CRUD Utilisateurs
* Accès tableau de bord

### 🧑‍💼 Agent / Juriste
* Consulter interventions
* Répondre
* Modifier statut
* Ajouter pièces jointes

## 🛠️ 8. Installation & Configuration
#### 1️⃣ Cloner le projet
```
git clone <url-du-repo>
cd projet-interventions
```

## 🚀 9. Installation Backend
```
cd backend
npm install 
```

Configurer .env <br/>
S’inspirer de .env.example :

```
PORT=3001
DATABASE_URL="mysql://user:password@localhost:3306/interventions"
JWT_SECRET="votre_secret"
```

Exécuter les migrations Prisma

```npx prisma migrate dev --name init```

Lancer le serveur

```npm run dev```

## 🎯 15. Qualité & bonnes pratiques
* Hash bcrypt
* JWT middleware
* Prisma (schema strict)
* Validation backend
* TanStack Query (cache optimisé)
* Code clair, structuré, commenté
