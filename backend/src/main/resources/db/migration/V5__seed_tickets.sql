-- V5: Seed Incident Tickets

WITH
  u_pasindu  AS (SELECT id FROM users WHERE email = 'it23661356@students.sliit.lk'),
  u_sahan    AS (SELECT id FROM users WHERE email = 'it23605770@students.sliit.lk'),
  u_chamara  AS (SELECT id FROM users WHERE email = 'it23100001@students.sliit.lk'),
  u_dinusha  AS (SELECT id FROM users WHERE email = 'it23100002@students.sliit.lk'),
  u_malsha   AS (SELECT id FROM users WHERE email = 'it23100003@students.sliit.lk'),
  u_nimal    AS (SELECT id FROM users WHERE email = 'technician.nimal@sliit.lk'),
  u_sunil    AS (SELECT id FROM users WHERE email = 'technician.sunil@sliit.lk'),
  r_lab01    AS (SELECT id FROM resources WHERE name = 'CS Lab 01 - Programming Lab'),
  r_lab02    AS (SELECT id FROM resources WHERE name = 'CS Lab 02 - Networking Lab'),
  r_lh04     AS (SELECT id FROM resources WHERE name = 'LH-04 Lecture Hall'),
  r_elec     AS (SELECT id FROM resources WHERE name = 'Electronics Lab')
INSERT INTO incident_tickets (id, resource_id, location, category, description, priority, status, reported_by_id, assigned_to_id, resolution_notes, created_at, updated_at)
SELECT gen_random_uuid(), r_lab01.id, 'CS Lab 01, Block C Ground Floor', 'IT', 'Workstation #14 in CS Lab 01 is not booting. Screen shows "Boot device not found" error. Tried restarting multiple times. Other students cannot use this machine.', 'HIGH', 'IN_PROGRESS', u_pasindu.id, u_nimal.id, NULL, NOW() - INTERVAL '2 days', NOW() FROM r_lab01, u_pasindu, u_nimal
UNION ALL
SELECT gen_random_uuid(), r_lh04.id, 'LH-04, Block B Second Floor', 'ELECTRICAL', 'Two ceiling lights at the front of LH-04 are flickering constantly during lectures. It is very distracting for students sitting in the front rows. Issue started 3 days ago.', 'MEDIUM', 'OPEN', u_chamara.id, NULL, NULL, NOW() - INTERVAL '3 days', NOW() FROM r_lh04, u_chamara
UNION ALL
SELECT gen_random_uuid(), r_lab02.id, 'CS Lab 02, Block C Ground Floor', 'IT', 'The Cisco switch connecting workstations 20-30 in Networking Lab appears to be faulty. Those 10 machines have no network connectivity. Packet Tracer exercises cannot be completed.', 'CRITICAL', 'RESOLVED', u_sahan.id, u_sunil.id, 'Replaced the faulty Cisco Catalyst 2960 switch with a spare unit from inventory. All 10 workstations now have full network connectivity. Tested and confirmed working.', NOW() - INTERVAL '5 days', NOW() FROM r_lab02, u_sahan, u_sunil
UNION ALL
SELECT gen_random_uuid(), NULL, 'Block A, Second Floor Corridor near Stairwell', 'PLUMBING', 'Water is leaking from the ceiling near the stairwell on Block A second floor corridor. The leak appears to be coming from the bathroom above. The floor is slippery and poses a safety hazard.', 'CRITICAL', 'IN_PROGRESS', u_dinusha.id, u_nimal.id, NULL, NOW() - INTERVAL '1 day', NOW() FROM u_dinusha, u_nimal
UNION ALL
SELECT gen_random_uuid(), r_elec.id, 'Electronics Lab, Block D Ground Floor', 'ELECTRICAL', 'Oscilloscope unit #3 in the Electronics Lab is showing incorrect readings. The time base calibration appears to be off. Students using it for lab sessions are getting wrong measurements.', 'MEDIUM', 'OPEN', u_malsha.id, NULL, NULL, NOW() - INTERVAL '4 hours', NOW() FROM r_elec, u_malsha
UNION ALL
SELECT gen_random_uuid(), NULL, 'Block C, First Floor Mens Restroom', 'PLUMBING', 'The tap in the mens restroom on Block C first floor is continuously running and cannot be turned off. This is wasting water. Has been like this since yesterday morning.', 'LOW', 'CLOSED', u_pasindu.id, u_sunil.id, 'Replaced the worn-out washer and O-ring in the tap. Tap now functions correctly and shuts off fully when closed.', NOW() - INTERVAL '7 days', NOW() FROM u_pasindu, u_sunil
UNION ALL
SELECT gen_random_uuid(), NULL, 'Block B, Ground Floor Corridor Air Conditioning Unit', 'HVAC', 'The air conditioning unit in Block B ground floor corridor is making a loud grinding noise and blowing warm air instead of cold. The area is very hot and uncomfortable for students waiting between classes.', 'HIGH', 'OPEN', u_chamara.id, NULL, NULL, NOW() - INTERVAL '6 hours', NOW() FROM u_chamara;
