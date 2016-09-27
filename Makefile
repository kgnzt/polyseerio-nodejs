BUILD_ENV?=development

all: install test

install:
	npm install

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

.PHONY: install lint unit-test integration-test validation-test
