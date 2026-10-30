CREATE DATABASE parking_db;

USE parking_db;


CREATE TABLE slots
(
    slot_no INT PRIMARY KEY,

    status VARCHAR(20)
    DEFAULT 'available'
);


INSERT INTO slots
VALUES
(1, 'available'),
(2, 'available'),
(3, 'available'),
(4, 'available'),
(5, 'available'),
(6, 'available'),
(7, 'available'),
(8, 'available'),
(9, 'available'),
(10, 'available');


CREATE TABLE vehicles
(
    id INT AUTO_INCREMENT PRIMARY KEY,

    vehicle_no VARCHAR(20) UNIQUE,

    vehicle_type VARCHAR(20),

    slot_no INT,

    entry_time TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (slot_no)
    REFERENCES slots(slot_no)
);