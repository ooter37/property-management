with rows as (
INSERT INTO houses (address, city, state, zipcode, rent, status, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING house_id
)
INSERT INTO linked (house_id, user_id, ownership)
SELECT house_id, $8, $9
FROM rows;

-- SELECT * FROM houses
-- WHERE user_id = $8