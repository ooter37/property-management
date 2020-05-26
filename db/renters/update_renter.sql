UPDATE renters
SET house_id = $2 WHERE renter_id = $1;

UPDATE renters
SET name = $3 WHERE renter_id = $1;

UPDATE renters
SET email = $4 WHERE renter_id = $1;

UPDATE renters
SET phone = $5 WHERE renter_id = $1;

UPDATE renters
SET primary = $6 WHERE renter_id = $1;