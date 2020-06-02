INSERT INTO transactions (user_id, house_id, amount, date, period, void)
VALUES
($1, $2, $3, $4, $5, false);