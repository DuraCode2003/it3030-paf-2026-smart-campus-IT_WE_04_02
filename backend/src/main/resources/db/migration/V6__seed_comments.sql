-- V6: Seed Comments

WITH
  t_lab01_ticket AS (SELECT id FROM incident_tickets WHERE description LIKE '%Workstation #14%'),
  t_switch_ticket AS (SELECT id FROM incident_tickets WHERE description LIKE '%Cisco switch%'),
  u_pasindu  AS (SELECT id FROM users WHERE email = 'it23661356@students.sliit.lk'),
  u_sahan    AS (SELECT id FROM users WHERE email = 'it23605770@students.sliit.lk'),
  u_nimal    AS (SELECT id FROM users WHERE email = 'technician.nimal@sliit.lk'),
  u_sunil    AS (SELECT id FROM users WHERE email = 'technician.sunil@sliit.lk')
INSERT INTO comments (id, ticket_id, author_id, content, created_at, updated_at)
SELECT gen_random_uuid(), t_lab01_ticket.id, u_nimal.id, 'I have inspected workstation #14. The SSD appears to have failed. I have ordered a replacement SSD from the IT store. Will complete the repair once the part arrives, expected tomorrow.', NOW() - INTERVAL '1 day', NOW() FROM t_lab01_ticket, u_nimal
UNION ALL
SELECT gen_random_uuid(), t_lab01_ticket.id, u_pasindu.id, 'Thank you for the update. Is there any chance a replacement workstation can be provided temporarily? We have lab sessions scheduled for tomorrow morning.', NOW() - INTERVAL '20 hours', NOW() FROM t_lab01_ticket, u_pasindu
UNION ALL
SELECT gen_random_uuid(), t_lab01_ticket.id, u_nimal.id, 'I have moved workstation #22 from the storage room as a temporary replacement. It is set up at the same position. The SSD replacement will be done by end of day tomorrow.', NOW() - INTERVAL '18 hours', NOW() FROM t_lab01_ticket, u_nimal
UNION ALL
SELECT gen_random_uuid(), t_switch_ticket.id, u_sunil.id, 'Confirmed the switch is faulty — port LEDs not lighting up for affected ports. Sourcing a replacement from spare inventory.', NOW() - INTERVAL '4 days', NOW() FROM t_switch_ticket, u_sunil
UNION ALL
SELECT gen_random_uuid(), t_switch_ticket.id, u_sahan.id, 'Any update on when this will be fixed? We have a networking assignment due this Friday and need those machines.', NOW() - INTERVAL '4 days', NOW() FROM t_switch_ticket, u_sahan
UNION ALL
SELECT gen_random_uuid(), t_switch_ticket.id, u_sunil.id, 'Replacement switch installed and all 10 machines are back online. Please verify from your end.', NOW() - INTERVAL '3 days', NOW() FROM t_switch_ticket, u_sunil
UNION ALL
SELECT gen_random_uuid(), t_switch_ticket.id, u_sahan.id, 'Confirmed — all machines are now connected. Thank you for the quick resolution.', NOW() - INTERVAL '3 days', NOW() FROM t_switch_ticket, u_sahan;
