SELECT linked.link_id, users.user_id, houses.house_id, users.email, houses.address, houses.city, houses.state, houses.zipcode, houses.rent, houses.status, houses.image FROM linked
JOIN users ON users.user_id = linked.user_id
JOIN houses ON houses.house_id = linked.house_id
WHERE users.user_id = $1;