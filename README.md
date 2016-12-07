![Alt text](/asset/polyseerio_sdk_nodejs.png?raw=true "Polyseer.io SDK for Node.js.")

# Polyseer.io SDK for Node.js

The official Polyseer.io SDK for Node.js. Detailed API information can be found at (https://polyseer.io/documentation).

## Requirements
  - Node.js
  - NPM

## Installation

To install inside a project, run:

    npm install polyseerio --save

## Example

Examples are available in /example

## Environment Variables

Certain values can be set in environment variables:

  * POLYSEERIO_TOKEN access-token used for API calls
  * NODE_ENV         the current environment
  * LOG_LEVEL        logging level for SDK


## Usage

This SDK provides direct platform interactions as well as a
configurable agent that can be used for immediate integration.

Example: (Quick start agent)

    // Uses environment variables: POLYSEERIO_TOKEN, NODE_ENV.
    return require('polyseerio').start().then(client => { console.log('ok') });

Example: (Configured quick start)

    // Provide a configuration object.
    const polyseerio = require('polyseerio'),
          config     = require('./config.json');

    return polyseerio.start(config).
      then(client => {
        console.log('ok');
      });

Example: (SDK)

    const polyseerio = require('polyseerio'),
          token      = 'an-access-token';

    const client = polyseerio({ token }); 

    const { Event, 
            Alert,
            Instance } = client;

    return Instance.attach({
      name: 'my-example-instance',
      strategy: Instance.attach.Strategy.FALLBACK
    }).then(instance => {
      console.log(`Instance attach as: ${instance.id}.`);

      return Event.create({
        name: `Attached ${instance.name}.`,
        color: polyseerio.Color.GREEN,
        icon: polyseerio.Icon.CHECK,
        description: `ID: ${instance.id}`
      });
    }).then(event => {
      console.log(`Event: ${event.id}, was triggered.`);

      return Alert.findByName('instance-attached');
    }).then(alert => {
      return alert.trigger({
        meta: {
          instance_name: 'my-example-instance'
        }
      });
    });

## Design

  * Provides direct SDK calls as well as a Polyseer.io Node.JS agent.
  * All client SDK calls return a Promise.
  * Supports functional style programming.
  * Supports object-oriented style programming.
    * ORM style instances. E.g. environment.save(), alert.trigger(), instance.gauge();
  * A resources environment can be deduced or explicitly passed to SDK calls through the options param.
  * Missing environment's will be upserted by default.
  * API calls are made using the https:// protocol.


## SDK Resources

Use of the SDK begins with construction of a client. To construct a client 
instance, call the required polyseerio module.

### polyseerio

  * polyseerio
    * `(config)`
      * `config`
        - `.agent` an agent config that will be used when startAgent is called
        - `.deduce` if the environment should be deduced from the environment when not supplied
        - `.env` environment variable holding current environment
        - `.timeout` integer containing number of ms to wait for server responses
        - `.token_env` if no token is provided this environment variable will be checked for one
        - `.token` environment variable holding current environment
        - `.upsert_env` if an environment is not found it will be created and the SDK call retried
        - `.version` api version to use
    * `.start(config)` generate a client and start an agent
      * `config` see above

### client

  * client
    * `.getCurrentEnvironment(options)`  Resolves the current environment **IF** it has been deduced.
    * `.startAgent(config)`              Starts the Polyseer.io agent.
      * `config`
        - `.attach`
        - `.attach_strategy`
        - `.name` instance name (will be used as a unique id)
        - `.description` a description of this instance
        - `.group` what group this instance belongs to
        - `.direction` the monitoring direction (inbound) // force this
        - `.subtype` the instance subtype: periodic or long_running.
        - `.expectation` will be upserted for this instance
          - `.is_alive` create an expectation that this process is alive
        - `.metric`
          - `.cpu` track user and system cpu usage
          - `.memory` track memory usage
          - `.uptime` track process uptime
        - `.event`
          - `.start` event notice when agent starts
          - `.stop` event notice when agent stops
        - `.process_event`
          - `.exit` event notice on process exit
          - `.warning` event notice on process warning
          - `.uncaughtException` event notice on uncaught execptions
          - `.unhandledRejection` event notice on unhandled promise rejections
        - `.process_signal`
          - `.SIGHUP` event notice when process receives SIGHUP
          - `.SIGINT` event notice when process receives SIGINT
          - `.SIGTERM` event notice when process receives SIGTERM
    * `.Color`
    * `.Icon`
    * `.Strategy`
    
### Alert

  * .Alert
    * `.create(attributes, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * `.findByName(name, options)`
    * `.remove(id, options)`
    * `.trigger(id, payload, options)`
    * `.update(id, updates, options)`
    * new **Alert**(attributes)
      * `.save()`
      * `.remove()`
      * `.trigger(payload)`

### Channel

  * .Channel
    * `.create(attributes, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * `.findByName(name, options)`
    * `.message(id, content, options)`
    * `.remove(id, options)`
    * `.update(id, updates, options)`
    * new **Channel**(attributes)
      * `.save()`
      * `.remove()`
      * `.message(content)`

### Environment

  * .Environment
    * `.create(attributes, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * `.findByName(name, options)`
    * `.message(id, content, options)`
    * `.remove(id, options)`
    * `.update(id, payload, options)`
    * new **Environment**(attributes)
      * `.save()`
      * `.remove()`
      * `.message(content)`

### Event

  * .Event
    * `.create(attributes, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * new **Event**(attributes)
      * `.save()`

### Expectation

  * .Expectation
    * `.check(id, options)`
    * `.create(attributes, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * `.findByName(name, options)`
    * `.remove(id, options)`
    * `.update(id, updates, options)`
    * new **Expectation**(attributes)
      * `.save()`
      * `.remove()`
      * `.check()`

### Instance

  * .Instance
    * `.attach(options)`
    * `.create(attributes, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * `.findByName(name, options)`
    * `.remove(id, options)`
    * `.update(id, updates, options)`
    * new **Instance**(attributes)
      * `.save()`
      * `.gauge()`
      * `.addGauge()`
      * `.remove()`
      * `.attach()`

### Logic Block

  * .LogicBlock
    * `.create(attributes, options)`
    * `.execute(id, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * `.findByName(name, options)`
    * `.remove(id, options)`
    * `.update(id, updates, options)`
    * new **LogicBlock**(attributes)
      * `.save()`
      * `.remove()`
      * `.execute()`

### Member

  * .Member
    * `.create(attributes, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * `.remove(id, options)`
    * `.update(id, updates, options)`
    * new **Member**(attributes)
      * `.save()`
      * `.remove()`

### Settings

  * .Settings
    * `.retrieve(options)`
    * `.update(updates, options)`

### Task

  * .Task
    * `.create(attributes, options)`
    * `.find(query, options)`
    * `.findById(id, options)`
    * `.remove(id, options)`
    * `.update(id, updates, options)`
    * new **Task**(attributes)
      * `.save()`
      * `.remove()`

## Testing

Testing requires:

  - Make
  - Grunt

Install node modules locally by running:

    npm install

Then run a command below based on what test suite you need to run.

### Lint

    make lint

### Unit

    make unit-test

### Integration

    make integration-test

### Validation

Requires the environment to have a root level access-token defined as:

    export ROOT_KEY=a-test-root-key

    make validation-test

### All

    make test

## Debugging

In order to debug an issue is can be helpful to enable debug logging. To do
so set the environment variable: LOG_LEVEL to debug.
