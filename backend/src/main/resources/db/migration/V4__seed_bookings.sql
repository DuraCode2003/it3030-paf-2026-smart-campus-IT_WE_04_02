-- V4: Seed Bookings with realistic time slots

WITH 
  u_admin    AS (SELECT id FROM users WHERE email = 'admin@sliit.lk'),
  u_pasindu  AS (SELECT id FROM users WHERE email = 'it23661356@students.sliit.lk'),
  u_sahan    AS (SELECT id FROM users WHERE email = 'it23605770@students.sliit.lk'),
  u_chamara  AS (SELECT id FROM users WHERE email = 'it23100001@students.sliit.lk'),
  u_dinusha  AS (SELECT id FROM users WHERE email = 'it23100002@students.sliit.lk'),
  u_malsha   AS (SELECT id FROM users WHERE email = 'it23100003@students.sliit.lk'),
  r_lh01     AS (SELECT id FROM resources WHERE name = 'LH-01 Main Auditorium'),
  r_lh02     AS (SELECT id FROM resources WHERE name = 'LH-02 Lecture Hall'),
  r_lab01    AS (SELECT id FROM resources WHERE name = 'CS Lab 01 - Programming Lab'),
  r_lab04    AS (SELECT id FROM resources WHERE name = 'CS Lab 04 - AI/ML Lab'),
  r_board    AS (SELECT id FROM resources WHERE name = 'Board Room - Faculty of Computing'),
  r_disc01   AS (SELECT id FROM resources WHERE name = 'Discussion Room 01'),
  r_proj1    AS (SELECT id FROM resources WHERE name = 'Epson EB-X51 Projector #1'),
  r_cam1     AS (SELECT id FROM resources WHERE name = 'Sony HXR-NX80 Video Camera #1')
INSERT INTO bookings (id, resource_id, user_id, start_date_time, end_date_time, purpose, expected_attendees, status, admin_note, created_at, updated_at)
SELECT gen_random_uuid(), r_lh01.id, u_pasindu.id, '2026-04-28 08:00:00'::TIMESTAMP, '2026-04-28 10:00:00'::TIMESTAMP, 'IT3030 PAF Project Demonstration Session', 35, 'APPROVED', 'Approved for final year demo day.', NOW(), NOW() FROM r_lh01, u_pasindu
UNION ALL
SELECT gen_random_uuid(), r_lab01.id, u_sahan.id, '2026-04-29 13:00:00'::TIMESTAMP, '2026-04-29 17:00:00'::TIMESTAMP, 'Spring Boot API development and testing session', 5, 'APPROVED', NULL, NOW(), NOW() FROM r_lab01, u_sahan
UNION ALL
SELECT gen_random_uuid(), r_board.id, u_admin.id, '2026-04-30 09:00:00'::TIMESTAMP, '2026-04-30 11:00:00'::TIMESTAMP, 'Faculty of Computing monthly staff meeting', 15, 'APPROVED', NULL, NOW(), NOW() FROM r_board, u_admin
UNION ALL
SELECT gen_random_uuid(), r_lh02.id, u_chamara.id, '2026-05-02 10:00:00'::TIMESTAMP, '2026-05-02 12:00:00'::TIMESTAMP, 'Software Engineering guest lecture by industry speaker', 100, 'PENDING', NULL, NOW(), NOW() FROM r_lh02, u_chamara
UNION ALL
SELECT gen_random_uuid(), r_lab04.id, u_dinusha.id, '2026-05-03 14:00:00'::TIMESTAMP, '2026-05-03 17:00:00'::TIMESTAMP, 'Machine learning model training session for final year project', 8, 'PENDING', NULL, NOW(), NOW() FROM r_lab04, u_dinusha
UNION ALL
SELECT gen_random_uuid(), r_disc01.id, u_malsha.id, '2026-04-27 15:00:00'::TIMESTAMP, '2026-04-27 16:00:00'::TIMESTAMP, 'Group study session for Data Structures exam', 6, 'REJECTED', 'Overlapping with a scheduled maintenance window for Block B.', NOW(), NOW() FROM r_disc01, u_malsha
UNION ALL
SELECT gen_random_uuid(), r_proj1.id, u_pasindu.id, '2026-04-28 07:30:00'::TIMESTAMP, '2026-04-28 11:00:00'::TIMESTAMP, 'Borrow projector for PAF demo presentation', 1, 'APPROVED', NULL, NOW(), NOW() FROM r_proj1, u_pasindu
UNION ALL
SELECT gen_random_uuid(), r_cam1.id, u_sahan.id, '2026-05-05 09:00:00'::TIMESTAMP, '2026-05-05 17:00:00'::TIMESTAMP, 'Record project demonstration video for submission', 2, 'PENDING', NULL, NOW(), NOW() FROM r_cam1, u_sahan;
