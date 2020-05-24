SELECT * FROM contractors
WHERE user_id = $1 OR user_id = 0;