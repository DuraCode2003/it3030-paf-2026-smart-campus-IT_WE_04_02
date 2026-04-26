-- V8: Migrate USER role → STUDENT and add lecturer roles
-- Students remain STUDENT; add two lecturer entries

-- Step 1: Update existing USER-role users to STUDENT
UPDATE users SET role = 'STUDENT' WHERE role = 'USER';

-- Step 2: Insert two lecturer users
INSERT INTO users (id, email, name, picture, role, created_at, updated_at) VALUES
(gen_random_uuid(), 'lec.kumara@sliit.lk',   'Dr. Kumara Bandara',    '', 'LECTURER', NOW(), NOW()),
(gen_random_uuid(), 'lec.senanayake@sliit.lk', 'Prof. Senanayake Wijetunga', '', 'LECTURER', NOW(), NOW());
