NAME = basiccache

$(NAME).min.js: $(NAME).js
	uglifyjs -cm --comments < $< > $@
clean:
	rm -f $(NAME).min.js

.PHONY: clean
