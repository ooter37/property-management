INSERT INTO contractors (user_id, name, email, address, city, state, zipcode, phone, services)
VALUES 
($1, $2, $3, $4, $5, $6, $7, $8, $9);


-- with rows as (
-- INSERT INTO contractors (user_id, name, email, address, city, state, zipcode, phone) VALUES (1, $2, $3, $4, $5, $6, $7, $8) RETURNING contractor_id
-- )
-- INSERT INTO services (contractor_id, user_id, service)
-- SELECT contractor_id, $1, $9
-- FROM rows;