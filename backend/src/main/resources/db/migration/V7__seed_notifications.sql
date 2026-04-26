-- V7: Seed Notifications

WITH
  u_pasindu  AS (SELECT id FROM users WHERE email = 'it23661356@students.sliit.lk'),
  u_sahan    AS (SELECT id FROM users WHERE email = 'it23605770@students.sliit.lk'),
  u_chamara  AS (SELECT id FROM users WHERE email = 'it23100001@students.sliit.lk'),
  u_malsha   AS (SELECT id FROM users WHERE email = 'it23100003@students.sliit.lk'),
  b_approved AS (SELECT id FROM bookings WHERE purpose LIKE '%PAF Project Demonstration%'),
  b_rejected AS (SELECT id FROM bookings WHERE purpose LIKE '%Group study session%'),
  t_lab01    AS (SELECT id FROM incident_tickets WHERE description LIKE '%Workstation #14%'),
  t_switch   AS (SELECT id FROM incident_tickets WHERE description LIKE '%Cisco switch%')
INSERT INTO notifications (id, recipient_id, type, title, message, reference_id, reference_type, is_read, created_at)
SELECT gen_random_uuid(), u_pasindu.id, 'BOOKING_APPROVED', 'Booking Approved', 'Your booking for LH-01 Main Auditorium on 28 April 2026 (08:00–10:00) has been approved.', b_approved.id, 'BOOKING', false, NOW() - INTERVAL '1 day' FROM u_pasindu, b_approved
UNION ALL
SELECT gen_random_uuid(), u_malsha.id, 'BOOKING_REJECTED', 'Booking Rejected', 'Your booking for Discussion Room 01 on 27 April 2026 has been rejected. Reason: Overlapping with a scheduled maintenance window for Block B.', b_rejected.id, 'BOOKING', false, NOW() - INTERVAL '2 days' FROM u_malsha, b_rejected
UNION ALL
SELECT gen_random_uuid(), u_pasindu.id, 'TICKET_STATUS_CHANGED', 'Ticket Update', 'Your incident ticket regarding Workstation #14 in CS Lab 01 is now IN PROGRESS. A technician has been assigned.', t_lab01.id, 'TICKET', true, NOW() - INTERVAL '1 day' FROM u_pasindu, t_lab01
UNION ALL
SELECT gen_random_uuid(), u_sahan.id, 'TICKET_STATUS_CHANGED', 'Ticket Resolved', 'Your incident ticket regarding the Cisco switch in CS Lab 02 has been marked RESOLVED. Please verify and confirm.', t_switch.id, 'TICKET', true, NOW() - INTERVAL '3 days' FROM u_sahan, t_switch
UNION ALL
SELECT gen_random_uuid(), u_pasindu.id, 'NEW_COMMENT', 'New Comment on Your Ticket', 'Technician Nimal Fernando commented on your ticket: "I have inspected workstation #14. The SSD appears to have failed..."', t_lab01.id, 'TICKET', false, NOW() - INTERVAL '1 day' FROM u_pasindu, t_lab01
UNION ALL
SELECT gen_random_uuid(), u_sahan.id, 'NEW_COMMENT', 'New Comment on Your Ticket', 'Technician Sunil Jayawardena commented on your ticket: "Replacement switch installed and all 10 machines are back online."', t_switch.id, 'TICKET', true, NOW() - INTERVAL '3 days' FROM u_sahan, t_switch;
