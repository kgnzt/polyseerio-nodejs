BUILD_ENV?=development
BABEL?=./node_modules/.bin/babel
NVM?=~/.nvm/nvm.sh
SUPPORTED?=\
v7.0.0 \
v6.0.0 \
v5.0.0 \
v4.0.0
FULL_SUPPORTED?=\
v7.3.0 \
v7.2.1 \
v7.2.0 \
v7.1.0 \
v7.0.0 \
v6.9.2 \
v6.9.1 \
v6.9.0 \
v6.8.1 \
v6.8.0 \
v6.7.0 \
v6.6.0 \
v6.5.0 \
v6.4.0 \
v6.3.1 \
v6.3.0 \
v6.2.2 \
v6.2.1 \
v6.2.0 \
v6.1.0 \
v6.0.0 \
v5.12.0 \
v5.11.1 \
v5.11.0 \
v5.10.1 \
v5.10.0 \
v5.9.1 \
v5.9.0 \
v5.8.0 \
v5.7.1 \
v5.7.0 \
v5.6.0 \
v5.5.0 \
v5.4.1 \
v5.4.0 \
v5.3.0 \
v5.2.0 \
v5.1.1 \
v5.1.0 \
v5.0.0 \
v4.7.0 \
v4.6.2 \
v4.6.1 \
v4.6.0 \
v4.5.0 \
v4.4.7 \
v4.4.6 \
v4.4.5 \
v4.4.4 \
v4.4.3 \
v4.4.2 \
v4.4.1 \
v4.4.0 \
v4.3.2 \
v4.3.1 \
v4.3.0 \
v4.2.6 \
v4.2.5 \
v4.2.4 \
v4.2.3 \
v4.2.2 \
v4.2.1 \
v4.2.0 \
v4.1.2 \
v4.1.1 \
v4.1.0 \
v4.0.0 \

all: install test

compile-lib:
	$(BABEL) ./src -d ./lib --copy-files

compile-test:
	$(BABEL) ./test -d ./test-dist --copy-files

compile: compile-lib compile-test

install:
	npm install

# install supported versions
version-install:
	for i in $(SUPPORTED) ; do \
    source $(NVM);\
    nvm install $$i;\
  done

lint:
ifeq ($(BUILD_ENV),ci)
	grunt jshint:file
else
	grunt jshint:stdout
endif

raw-unit-test:
ifeq ($(BUILD_ENV),ci)
	grunt mochaTest:unit_file
else
	grunt mochaTest:unit_stdout
endif
unit-test: compile raw-unit-test

raw-integration-test:
ifeq ($(BUILD_ENV),ci)
	grunt mochaTest:integration_file
else
	grunt mochaTest:integration_stdout
endif
integration-test: compile raw-integration-test

raw-validation-test:
ifeq ($(BUILD_ENV),ci)
	grunt mochaTest:validation_file
else
	grunt mochaTest:validation_stdout
endif
validation-test: compile raw-validation-test

# test package against all supported versions (when they are installed)
version-test: version-install
	for i in $(FULL_SUPPORTED) ; do \
    source $(NVM);\
    if nvm which $$i ; then \
      nvm use $$i;\
      $(MAKE) unit-test;\
      $(MAKE) integration-test;\
      $(MAKE) validation-test;\
    else \
      echo "Skipping..." && continue;\
    fi \
  done

# complete test sequence
test: lint \
      compile \
      raw-unit-test \
      raw-integration-test \
      raw-validation-test

.PHONY: compile-lib \
        compile-test \
        compile \
        install \
        version-install \
        lint \
        raw-unit-test \
        unit-test \
        integration-test \
        raw-integration-test \
        validation-test \
        raw-validation-test \
        version-test
