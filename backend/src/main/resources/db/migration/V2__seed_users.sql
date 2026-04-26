INSERT INTO users (id, email, name, picture, role, created_at, updated_at) VALUES
(gen_random_uuid(), 'admin@sliit.lk', 'Dr. Kamal Perera', '', 'ADMIN', NOW(), NOW()),
(gen_random_uuid(), 'it23661356@students.sliit.lk', 'Pasindu Dilshan', '', 'USER', NOW(), NOW()),
(gen_random_uuid(), 'it23605770@students.sliit.lk', 'Sahan Rathnayake', '', 'USER', NOW(), NOW()),
(gen_random_uuid(), 'technician.nimal@sliit.lk', 'Nimal Fernando', '', 'TECHNICIAN', NOW(), NOW()),
(gen_random_uuid(), 'technician.sunil@sliit.lk', 'Sunil Jayawardena', '', 'TECHNICIAN', NOW(), NOW()),
(gen_random_uuid(), 'it23100001@students.sliit.lk', 'Chamara Silva', '', 'USER', NOW(), NOW()),
(gen_random_uuid(), 'it23100002@students.sliit.lk', 'Dinusha Bandara', '', 'USER', NOW(), NOW()),
(gen_random_uuid(), 'it23100003@students.sliit.lk', 'Malsha Wickramasinghe', '', 'USER', NOW(), NOW());
