UPDATE houses
SET address = $2 WHERE house_id = $1;

UPDATE houses
SET city = $3 WHERE house_id = $1;

UPDATE houses
SET state = $4 WHERE house_id = $1;

UPDATE houses
SET zipcode = $5 WHERE house_id = $1;

UPDATE houses
SET rent = $6 WHERE house_id = $1;

UPDATE houses
SET status = $7 WHERE house_id = $1;

-- UPDATE linked
-- SET ownership = $8 WHERE 