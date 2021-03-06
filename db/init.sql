CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR,
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
    user_id INT REFERENCES users(user_id),
    address VARCHAR,
    city VARCHAR,
    state VARCHAR,
    rent INT,
    status VARCHAR,
    zipcode INT,
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
    type VARCHAR,
    date TEXT,
    price INT,
    urgent BOOLEAN,
    note TEXT,
    contact VARCHAR
);
INSERT INTO tasks (user_id, house_id, type, date, price, urgent, note, contact)
VALUES
(1,4,'Tree Trimming','06/11/2020', 1000, false, 'Two trees in front, one in back.', 'Carlos'),
(1,4,'Replace Sprinklers','07/17/2020', 400, false, 'Damage to two sprinklers by driveway.', 'Francisco'),
(1,4,'Repair','5/18/2020', 200, true, 'Celing fan in living room broken.', 'Mike');

CREATE TABLE contractors (
    contractor_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    name VARCHAR,
    email VARCHAR,
    address VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zipcode VARCHAR,
    phone INT,
);
INSERT INTO contractors (user_id, name, email, address, city, state, zipcode, phone)
VALUES
(0, 'Derek Lamarr', 'derekpropman@pineapplelighting.com', '123 Fake St.', 'Phoenix', 'AZ', 85020, 1234567890);

-- CREATE TABLE contractor_notes (
--     contractor_note_id SERIAL PRIMARY KEY,
--     user_id  INT REFERENCES users(user_id),
--     contractor_id  INT REFERENCES contractor(contractor_id)
-- );

CREATE TABLE renters (
    renter_id SERIAL PRIMARY KEY,
    user_id  INT REFERENCES users(user_id),
    house_id INT REFERENCES houses(house_id),
    name VARCHAR,
    email VARCHAR,
    phone INT,
    main BOOLEAN
);
INSERT INTO renters (user_id, house_id, name, email, phone, main)
VALUES
(1,24,'Derek Lamarr','derek@derek.com',5551112233,true),
(1,23,'Chicken','chicken@chicken.com',5551112233,true),
(1,25,'Leo Lamarr','leo@derek.com',5551112233,true),
(1,25,'Harriet Lamarr','harriet@derek.com',1234567890,false);

-- CREATE TABLE rent (
--     rent_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(user_id),
--     house_id INT REFERENCES houses(house_id),
--     amount INT,
--     period VARCHAR,
--     due VARCHAR,
--     note TEXT,
--     paid BOOLEAN,
--     void BOOLEAN
-- );

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    house_id INT REFERENCES houses(house_id),
    amount INT,
    date VARCHAR,
    tag VARCHAR,
    note TEXT,
    period VARCHAR,
    void BOOLEAN
);
INSERT INTO transactions (user_id, house_id, amount, date, tag, period)
VALUES
(1, 115, 2000, '2020-04-29T15:48:57.148Z', 'Monthly Rent'),
(1, 115, 2000, '2020-03-29T15:48:57.148Z', 'Monthly Rent'),
(1, 115, 2000, '2020-05-29T15:48:57.148Z', 'Monthly Rent'),
(1, 137, 2000, '2020-05-25T15:48:57.148Z', 'Monthly Rent'),
(1, 138, 2000, '2020-06-01T15:48:57.148Z', 'Monthly Rent'),
(1, 114, 2000, '2020-05-30T15:48:57.148Z', 'Monthly Rent');

CREATE TABLE due (
    due_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    house_id INT REFERENCES houses(house_id),
    amount INT,
    date VARCHAR,
    tag VARCHAR,
    note TEXT,
    period VARCHAR,
    void BOOLEAN
);