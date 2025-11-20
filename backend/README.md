+-------------+         +-------------+        +-------------+
|   Commune   | 1 ----- *| Intervention|* ----- 1|    Theme   |
|-------------|         |-------------|        |-------------|
| id          |         | id          |        | id          |
| nom         |         | communeId   |        | nom         |
| codePostal  |         | themeId     |        +-------------+
+-------------+         | utilisateurId |
                        | nomUsager   |
                        | prenomUsager|
                        | question    |
                        | reponse     |
                        | statut      | ---> Statut (EN_COURS, TRAITEE, ARCHIVEE)
                        | dateCreation|
                        | dateReponse |
                        | satisfaction|
                        +-------------+
                              |
                              | 1
                              | 
                              * 
                       +---------------+
                       | PieceJointe   |
                       |---------------|
                       | id            |
                       | interventionId|
                       | publicId      |
                       | secureUrl     |
                       | type          |
                       +---------------+
                              ^
                              |
                              * 
                       +---------------+
                       | Utilisateur   |
                       |---------------|
                       | id            |
                       | nom           |
                       | prenom        |
                       | email         |
                       | motDePasseHash|
                       | role         | ---> Role (ADMIN, AGENT)
                       +---------------+
