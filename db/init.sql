CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(30),
    hashed_password TEXT
);

CREATE TABLE linked (
    link_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    house_id INT REFERENCES houses(house_id),
    ownership VARCHAR(30)
);
INSERT INTO linked (user_id,house_id)
VALUES
(1,4),
(1,5),
(1,6);


CREATE TABLE houses (
    house_id SERIAL PRIMARY KEY,
    address VARCHAR(50),
    city VARCHAR(20),
    state VARCHAR(20),
    zipcode INT,
    rent INT,
    status VARCHAR(20),
    image TEXT
);
INSERT INTO houses (address, city, state, zipcode, rent, status)
VALUES
('820 E Belmont Ave', 'Phoenix', 'Arizona', 85020, 0, 'Primary Residence'),
('4776 N 20th Ave', 'Phoenix', 'Arizona', 85015, 1300, 'Long Term Rental'),
('2624 E Highland Ave', 'Phoenix', 'Arizona', 85016, 1300, 'Short Term Rental');

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    house_id INT REFERENCES houses(house_id),
    type VARCHAR(20),
    date TEXT,
    price INT,
    urgent BOOLEAN,
    note TEXT,
    contact VARCHAR(20)
);
INSERT INTO tasks (user_id, house_id, type, date, price, urgent, note, contact)
VALUES
(1,4,'Tree Trimming','06/11/2020', 1000, false, 'Two trees in front, one in back.', 'Carlos'),
(1,4,'Replace Sprinklers','07/17/2020', 400, false, 'Damage to two sprinklers by driveway.', 'Francisco'),
(1,4,'Repair','5/18/2020', 200, true, 'Celing fan in living room broken.', 'Mike');