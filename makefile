.PHONY: clean
clean:
	rm -rf build

.PHONY: distclean
distclean: clean
	rm -rf node_modules
