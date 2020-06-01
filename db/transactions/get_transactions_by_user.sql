SELECT * FROM transactions
JOIN houses ON houses.house_id = transactions.house_id
WHERE transactions.user_id = $1;