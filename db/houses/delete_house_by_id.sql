DELETE FROM linked
WHERE house_id = $1;

DELETE FROM tasks
WHERE house_id = $1;

DELETE FROM renters
WHERE house_id = $1;

DELETE FROM houses
WHERE house_id = $1;