INSERT INTO tasks (user_id, house_id, type, date, price, urgent, note, contact)
VALUES 
($1, $2, $3, $4, $5, $6, $7, $8);
-- (${userId}, ${houseId}, ${type}, ${date}, ${price}, ${urgent}, ${note}, ${contact});