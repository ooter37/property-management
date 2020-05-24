UPDATE contractors
SET name = $2 WHERE contractor_id = $1;

UPDATE contractors
SET email = $3 WHERE contractor_id = $1;

UPDATE contractors
SET address = $4 WHERE contractor_id = $1;

UPDATE contractors
SET city = $5 WHERE contractor_id = $1;

UPDATE contractors
SET state = $6 WHERE contractor_id = $1;

UPDATE contractors
SET zipcode = $7 WHERE contractor_id = $1;

UPDATE contractors
SET phone = $8 WHERE contractor_id = $1;