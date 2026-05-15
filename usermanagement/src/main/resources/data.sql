INSERT IGNORE INTO roles (nom, description) VALUES
('ADMIN', 'Administrateur système'),
('MODERATEUR', 'Modérateur'),
('UTILISATEUR', 'Utilisateur standard');

INSERT IGNORE INTO utilisateurs (nom, email, mot_de_passe, role_id, actif) VALUES
('Super Admin', 'admin@test.com',
 '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpwTTyU9TtMjK',
 1, true);
-- mot de passe: password123