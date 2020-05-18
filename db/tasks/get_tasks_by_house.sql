SELECT * FROM tasks
JOIN houses ON houses.house_id = tasks.house_id
WHERE houses.house_id = $1;