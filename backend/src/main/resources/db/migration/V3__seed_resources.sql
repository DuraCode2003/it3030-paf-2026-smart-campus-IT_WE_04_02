INSERT INTO resources (id, name, type, capacity, location, description, status, created_at, updated_at) VALUES
-- Lecture Halls
(gen_random_uuid(), 'LH-01 Main Auditorium', 'LECTURE_HALL', 300, 'Block A, Ground Floor', 'Main auditorium with projector, PA system, and air conditioning. Suitable for large lectures and events.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'LH-02 Lecture Hall', 'LECTURE_HALL', 120, 'Block A, First Floor', 'Standard lecture hall with dual projectors and whiteboards.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'LH-03 Lecture Hall', 'LECTURE_HALL', 120, 'Block A, First Floor', 'Standard lecture hall with dual projectors and whiteboards.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'LH-04 Lecture Hall', 'LECTURE_HALL', 80, 'Block B, Second Floor', 'Medium lecture hall with smart board and video conferencing setup.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'LH-05 Lecture Hall', 'LECTURE_HALL', 80, 'Block B, Second Floor', 'Medium lecture hall with smart board.', 'OUT_OF_SERVICE', NOW(), NOW()),

-- Labs
(gen_random_uuid(), 'CS Lab 01 - Programming Lab', 'LAB', 40, 'Block C, Ground Floor', '40 workstations with Intel Core i7, 16GB RAM, dual monitors. Installed: IntelliJ, VS Code, Eclipse, MySQL Workbench, Postman.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'CS Lab 02 - Networking Lab', 'LAB', 30, 'Block C, Ground Floor', '30 workstations with Cisco networking equipment, packet tracer installed.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'CS Lab 02 - Networking Lab', 'LAB', 30, 'Block C, Ground Floor', '30 workstations with Cisco networking equipment, packet tracer installed.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'CS Lab 03 - Database Lab', 'LAB', 35, 'Block C, First Floor', '35 workstations with Oracle, MySQL, PostgreSQL, MongoDB installed.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'CS Lab 04 - AI/ML Lab', 'LAB', 25, 'Block D, First Floor', 'High-performance workstations with NVIDIA GPUs, Python, TensorFlow, PyTorch, Jupyter installed.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Electronics Lab', 'LAB', 20, 'Block D, Ground Floor', 'Electronics components, oscilloscopes, Arduino/Raspberry Pi kits, soldering stations.', 'ACTIVE', NOW(), NOW()),

-- Meeting Rooms
(gen_random_uuid(), 'Board Room - Faculty of Computing', 'MEETING_ROOM', 20, 'Block A, Third Floor', 'Executive meeting room with 4K display, video conferencing, and whiteboard wall.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Discussion Room 01', 'MEETING_ROOM', 8, 'Block B, Ground Floor', 'Small group discussion room with TV screen and whiteboard.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Discussion Room 02', 'MEETING_ROOM', 8, 'Block B, Ground Floor', 'Small group discussion room with TV screen and whiteboard.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Discussion Room 03', 'MEETING_ROOM', 12, 'Block C, Second Floor', 'Medium meeting room with projector and video conferencing.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Seminar Room - Block E', 'MEETING_ROOM', 50, 'Block E, First Floor', 'Seminar room with tiered seating, projector, and microphone system.', 'ACTIVE', NOW(), NOW()),

-- Equipment
(gen_random_uuid(), 'Epson EB-X51 Projector #1', 'EQUIPMENT', 1, 'AV Store Room, Block A', 'Portable projector, 3600 lumens, HDMI/VGA. Carry case included.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Epson EB-X51 Projector #2', 'EQUIPMENT', 1, 'AV Store Room, Block A', 'Portable projector, 3600 lumens, HDMI/VGA. Carry case included.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Epson EB-X51 Projector #3', 'EQUIPMENT', 1, 'AV Store Room, Block A', 'Portable projector, 3600 lumens, HDMI/VGA. Carry case included.', 'OUT_OF_SERVICE', NOW(), NOW()),
(gen_random_uuid(), 'Sony HXR-NX80 Video Camera #1', 'EQUIPMENT', 1, 'AV Store Room, Block A', '4K video camera with tripod and carry case. For events and recordings.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Sony HXR-NX80 Video Camera #2', 'EQUIPMENT', 1, 'AV Store Room, Block A', '4K video camera with tripod and carry case.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'Portable PA System', 'EQUIPMENT', 1, 'AV Store Room, Block B', 'Portable speaker system with 2 wireless microphones. For outdoor events.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'MacBook Pro 16" (Loaner) #1', 'EQUIPMENT', 1, 'IT Help Desk, Block C', 'Apple M3 Pro, 18GB RAM, 512GB SSD. Available for short-term loan.', 'ACTIVE', NOW(), NOW()),
(gen_random_uuid(), 'MacBook Pro 16" (Loaner) #2', 'EQUIPMENT', 1, 'IT Help Desk, Block C', 'Apple M3 Pro, 18GB RAM, 512GB SSD. Available for short-term loan.', 'ACTIVE', NOW(), NOW());
