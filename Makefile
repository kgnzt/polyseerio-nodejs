BUILD_ENV?=development
SUPPORTED?=\
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

NVM?=~/.nvm/nvm.sh

all: install test

install:
	npm install

version-test:
	for i in $(SUPPORTED) ; do \
    source $(NVM);\
    if nvm which $$i ; then \
      nvm use $$i;\
      $(MAKE) test;\
    else \
      echo "Skipping..." && continue;\
    fi \
  done

lint:
ifeq ($(BUILD_ENV),ci)
	grunt jshint:file
else
	grunt jshint:stdout
endif

unit-test:
ifeq ($(BUILD_ENV),ci)
	grunt mochaTest:unit_file
else
	grunt mochaTest:unit_stdout
endif

integration-test:
ifeq ($(BUILD_ENV),ci)
	grunt mochaTest:integration_file
else
	grunt mochaTest:integration_stdout
endif

validation-test:
ifeq ($(BUILD_ENV),ci)
	grunt mochaTest:validation_file
else
	grunt mochaTest:validation_stdout
endif

test: lint unit-test integration-test validation-test

.PHONY: install lint unit-test integration-test validation-test version-test
