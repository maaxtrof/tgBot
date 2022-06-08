run:
	docker run -d -p 80:3000 -v bot:/app --name myBot tgbot:latest
run-dev:
	docker run -d -p 80:3000 -v "D:\My\Prog\Projects\tgBot:/app" -v /app/node_modules -v bot:/app --name myBot tgbot:latest

stop:
	docker stop myBot