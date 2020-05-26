SELECT * FROM renters
JOIN houses ON houses.house_id = houses.house_id
WHERE users.user_id = $1;