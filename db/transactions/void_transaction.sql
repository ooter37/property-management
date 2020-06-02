UPDATE transactions
SET void = true
WHERE transaction_id = $1;