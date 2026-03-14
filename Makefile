.PHONY: test deploy check

test:
	node tests/lib.test.js

deploy:
	firebase deploy

check: test deploy
