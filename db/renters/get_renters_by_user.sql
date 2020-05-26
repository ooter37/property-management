SELECT * FROM renters
JOIN houses ON houses.house_id = renters.house_id
WHERE renters.user_id = $1;