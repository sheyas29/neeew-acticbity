-- Drop tables if they already exist
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS activities;

-- Create the activities table
CREATE TABLE activities (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_name VARCHAR(255) NOT NULL
);

-- Create the events table
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT,
    hr INT,
    min INT,
    sec INT,
    event_number VARCHAR(10),
    event_name VARCHAR(255),
    confirmation_by VARCHAR(255),
    status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
);

-- Insert sample data into activities
INSERT INTO activities (activity_name) VALUES 
('Topic 1'),
('Topic 2'),
('Topic 3'),
('Topic 4'),
('Topic 5'),
('Topic 6'),
('Topic 7'),
('Topic 8'),
('Topic 9'),
('Topic 10');

-- Insert sample data into events
INSERT INTO events (activity_id, hr, min, sec, event_number, event_name, confirmation_by) VALUES 
(1, -2, 0, 0, '1', 'Event A1', 'User A'),
(1, NULL, NULL, NULL, '1.1', 'Event A1.1', 'User A'),
(1, NULL, NULL, NULL, '1.2', 'Event A1.2', 'User A'),
(1, -2, 0, 5, '2', 'Event A2', 'User B'),
(1, NULL, NULL, NULL, '2.1', 'Event A2.1', 'User B'),
(2, -1, 50, 5, '3', 'Event B1', 'User C'),
(2, NULL, NULL, NULL, '3.1', 'Event B1.1', 'User C'),
(2, NULL, NULL, NULL, '3.2', 'Event B1.2', 'User C'),
(3, -1, 15, 5, '4', 'Event C1', 'User D'),
(4, -3, 10, 0, '1', 'Event D1', 'User E'),
(4, NULL, NULL, NULL, '1.1', 'Event D1.1', 'User E'),
(4, NULL, NULL, NULL, '1.2', 'Event D1.2', 'User E'),
(4, -3, 10, 5, '2', 'Event D2', 'User F'),
(4, NULL, NULL, NULL, '2.1', 'Event D2.1', 'User F'),
(5, -1, 40, 5, '3', 'Event E1', 'User G'),
(5, NULL, NULL, NULL, '3.1', 'Event E1.1', 'User G'),
(5, NULL, NULL, NULL, '3.2', 'Event E1.2', 'User G'),
(6, -1, 25, 5, '4', 'Event F1', 'User H'),
(7, -2, 5, 0, '1', 'Event G1', 'User I'),
(7, NULL, NULL, NULL, '1.1', 'Event G1.1', 'User I'),
(7, NULL, NULL, NULL, '1.2', 'Event G1.2', 'User I'),
(7, -2, 5, 5, '2', 'Event G2', 'User J'),
(7, NULL, NULL, NULL, '2.1', 'Event G2.1', 'User J'),
(8, -1, 35, 5, '3', 'Event H1', 'User K'),
(8, NULL, NULL, NULL, '3.1', 'Event H1.1', 'User K'),
(8, NULL, NULL, NULL, '3.2', 'Event H1.2', 'User K'),
(9, -1, 20, 5, '4', 'Event I1', 'User L'),
(10, -2, 10, 0, '1', 'Event J1', 'User M'),
(10, NULL, NULL, NULL, '1.1', 'Event J1.1', 'User M'),
(10, NULL, NULL, NULL, '1.2', 'Event J1.2', 'User M'),
(10, -2, 10, 5, '2', 'Event J2', 'User N'),
(10, NULL, NULL, NULL, '2.1', 'Event J2.1', 'User N');
