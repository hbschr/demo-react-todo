SHELL := /bin/bash

.PHONY: clean
clean:
	rm -rf build

.PHONY: distclean
distclean: clean
	rm -rf node_modules
	git checkout package-lock.json

.PHONY: progress
progress: distclean
	time npm install

.PHONY: no-progress
no-progress: distclean
	time npm install --no-progress
