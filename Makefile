_: npm-install build start

build:
	DOCKER_BUILDKIT=1 docker-compose build --pull --parallel

start:
	docker-compose up -d

restart:
	docker-compose up -d --force-recreate

cli:
	docker-compose run --rm cli ash

npm-install:
	docker-compose run --rm cli npm install

npm-upgrade:
	docker-compose run --rm cli npm upgrade