SELECT * FROM transactions
JOIN houses ON houses.house_id = transactions.house_id
WHERE transactions.house_id = $1;