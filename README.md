![Alt text](/asset/polyseerio_sdk_nodejs.png?raw=true "Polyseer.io SDK for Node.js.")

# Polyseer.io SDK for Node.js

The official Polyseer.io SDK for Node.js. Detailed API information can be found at (https://polyseer.io/documentation).

## Requirements
  - Node.js
  - NPM

## Installation

To install inside a project, run:

    npm install polyseerio --save

## Usage

This SDK enables direct platform interactions and also provides a
configurable agent that can be used for immediate integration.

Example: (SDK using Agent)

    const polyseerio = require('polyseerio'),
          config     = require('./poly.json');

    return polyseerio(config).startAgent().
      then(client => {
        console.log('Polyseer.io agent has started.');
      });

Example: (SDK)

    const polyseerio = require('polyseerio'),
          token      = 'an-access-token';

    const { Event, 
            Alert,
            Instance } = polyseerio({ token }); 

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
  * Environment missing in Polyseer.io will be upserted by default.
  * API calls are made using the https:// protocol.


## Example

Examples are available in /example

## Agent Configuration

A Polyseer.io Node.JS agent can be started once a client has been created 
(see SDK Resources). The agent has a default configuration that can be adjusted
as needed.

  * client.startAgent(config)
    * `config`
      - `.attach`
      - `.attach_strategy`
      - `.name`
      - `.description`
      - `.group`
      - `.direction`
      - `.subtype`
      - `.expectation`
        - `.is_alive`
      - `.metric`
        - `.cpu`
        - `.memory`
      - `.event`
        - `.start`
      - `.process_event`
        - `.exit`
        - `.warning`
        - `.uncaughtException`
        - `.unhandledRejection`
      - `.process_signal`
        - `.SIGHUP`
        - `.SIGINT`
        - `.SIGTERM`

## SDK Resources

Use of the SDK begins with construction of a client. To construct a client 
instance, call the required polyseerio module.

### polyseerio

  * polyseerio(config)
    * `config`
      - `.agent` an agent config that will be used when startAgent is called
      - `.deduce` if the environment should be deduced from the environment when not supplied
      - `.env` environment variable holding current environment
      - `.timeout` integer containing number of ms to wait for server responses
      - `.token_env` if no token is provided this environment variable will be checked for one
      - `.token` environment variable holding current environment
      - `.upsert_env` if an environment is not found it will be created and the SDK call retried
      - `.version` api version to use

### client

  * client
    * `.getCurrentEnvironment(options)`  Resolves the current environment **IF** it has been deduced.
    * `.startAgent(config)`              Starts the Polyseer.io agent. Will merge passed config with config.agent from client construction.
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
