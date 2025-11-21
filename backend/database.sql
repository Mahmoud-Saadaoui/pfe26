CREATE DATABASE IF NOT EXISTS pfe_interventions;
USE pfe_interventions;

-- Table: Commune
CREATE TABLE IF NOT EXISTS commune (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Theme
CREATE TABLE IF NOT EXISTS theme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Utilisateur
CREATE TABLE IF NOT EXISTS utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    role ENUM('admin', 'agent') NOT NULL DEFAULT 'agent',
    theme_id INT, -- Optional: if an agent is assigned to a specific theme
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (theme_id) REFERENCES theme(id) ON DELETE SET NULL
);

-- Table: Intervention
CREATE TABLE IF NOT EXISTS intervention (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_reponse TIMESTAMP NULL,
    statut ENUM('New', 'In Progress', 'Processed', 'Archived') DEFAULT 'New',
    reponse TEXT,
    piece_jointe VARCHAR(255),
    satisfaction_rating INT CHECK (satisfaction_rating BETWEEN 1 AND 5),
    commune_id INT NOT NULL,
    theme_id INT NOT NULL,
    utilisateur_id INT, -- The agent assigned or who answered
    FOREIGN KEY (commune_id) REFERENCES commune(id) ON DELETE CASCADE,
    FOREIGN KEY (theme_id) REFERENCES theme(id) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE SET NULL
);

-- Insert Default Admin (Password: Admin123!)
-- Note: The password hash below corresponds to 'Admin123!' generated via bcrypt
INSERT INTO utilisateur (nom, email, mot_de_passe, role) 
VALUES ('Super Admin', 'admin@test.com', '$2a$10$x.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z', 'admin');
-- (Note: In a real scenario, generate a real hash. The above is a placeholder pattern. 
-- Use a script to generate the hash for 'Admin123!' if needed, e.g., $2a$10$N.zmdr9k7uOcQb376Wy.j.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X)
