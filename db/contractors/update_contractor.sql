UPDATE contractors
SET name = $2 WHERE contractor_id = $1;

UPDATE contractors
SET email = $3 WHERE contractor_id = $1;

UPDATE contractors
SET phone = $4 WHERE contractor_id = $1;

UPDATE contractors
SET address = $5 WHERE contractor_id = $1;

UPDATE contractors
SET city = $6 WHERE contractor_id = $1;

UPDATE contractors
SET state = $7 WHERE contractor_id = $1;

UPDATE contractors
SET zipcode = $8 WHERE contractor_id = $1;

UPDATE contractors
SET services = $9 WHERE contractor_id = $1;
