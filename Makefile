migrates-up:
	migrate -path ./schema -database 'postgresql://postgres:admin@localhost:5432/onlineChat?sslmode=disable' up

migrates-down:
	migrate -path ./schema -database 'postgresql://postgres:admin@localhost:5432/onlineChat?sslmode=disable' down

