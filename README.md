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

The SDK allows for direct platform interactions as well as a configurable agent 
that can be used for immediate integration.

Example: (SDK with Agent)

    const polyseerio = require('polyseerio'),
          config     = require('./poly.json');

    const client = polyseerio(config);

    return client.startAgent().
      then(result => {
        console.log('Polyseer.io agent has started.');
      })

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

  * Configurable agent mode or SDK only modes available.
  * All client SDK calls return a Promise.
  * Supports functional style programming.
  * Supports object-oriented style programming.
    * ORM style instances. E.g. environment.save(), alert.trigger();
  * A resources environment can be deduced or explicitly passed to SDK calls through the options param.
  * API calls made using the https:// protocol.


## Example

Examples are available in /example

## SDK Resources

Use of the SDK begins with construction of a client. To construct a client 
instance, call the required polyseerio module with an access-token.

### polyseerio

  * polyseerio(config)
    * `options`
      - `.env` environment variable holding current environment
      - `.token` environment variable holding current environment
      - `.token_env` if no token is provided this environment variable will be checked
      - `.agent` an object that will be used when starting the agent
      - `.version` api version to use
      - `.timeout` integer containing number of ms to wait for server responses
      - `.deduce` if the environment should be deduced if not supplied

### client

  * client
    * `.getCurrentEnvironment(options)`  Resolves the current environment **IF** it has been deduced.
    * `.startAgent(config)`              Starts the Polyseer.io agent. Will use passed config or config.agent from client construction.
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
