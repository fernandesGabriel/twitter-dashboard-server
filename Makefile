_: npm-install build start

build:
	DOCKER_BUILDKIT=1 docker-compose build --pull --parallel

start:
	docker-compose up -d server

restart:
	docker-compose up -d --force-recreate server

cli:
	docker-compose run --rm cli ash

npm-install:
	docker-compose run --rm cli npm install

npm-upgrade:
	docker-compose run --rm cli npm upgrade