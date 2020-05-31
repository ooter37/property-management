SELECT * FROM tasks
JOIN houses ON houses.house_id = tasks.house_id
WHERE tasks.user_id = $1;