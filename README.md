![Alt text](/asset/polyseerio_sdk_nodejs.png?raw=true "Polyseer.io SDK for Node.js.")

# Polyseer.io SDK for Node.js

The official Polyseer.io SDK for Node.js. Detailed API information can be found at (https://polyseer.io/documentation).

## About

Polyseer.io is an Integrated Development Platform that instantly
provides teams with the resources needed to build, support, and maintain world 
class software products.

## Requirements
  - Node.js
  - NPM

## Installation

To install inside a project, run:

    npm install polyseerio --save

## Example

Be sure to check out the examples in /example.

## Environment Variables

Certain values can be set in environment variables:

  * POLYSEERIO_TOKEN     access-token used for API calls
  * NODE_ENV             the current environment
  * POLYSEERIO_LOG_LEVEL SDK logging level default error

## Usage

This SDK provides direct platform interactions as well as a
configurable agent that can be used for immediate integration.

Example: (Quick start agent)

    return require('polyseerio').start().then(client ⇒ { console.log('ok') });

Example: (Configured quick start)

    const polyseerio = require('polyseerio');

    return polyseerio.start({
        env: 'APP_ENV',
        environment: 'testing',
        agent: {
          id: 'my-instance-id',
          attach_strategy: polyseerio.Strategy.ID
        }
      }).
      then(client ⇒ {
        console.log('ok');
      });

Example: (SDK only)

    const polyseerio = require('polyseerio'),
          client = polyseerio({ token: 'my-access-token' }),
          { Event, 
            Alert,
            Instance } = client;

    return Instance.attach({
      name: 'my-example-instance',
      strategy: Instance.attach.Strategy.FALLBACK
    }).then(instance ⇒ {
      console.log(`Manual instance attached as: ${instance.get('id')}.`);

      return Event.create({
        name: `Attached ${instance.get('name')}.`,
        color: polyseerio.Color.GREEN,
        icon: polyseerio.Icon.CHECK,
        description: `ID: ${instance.get('id')}`
      });
    }).then(event ⇒ {
      console.log(`Event: ${event.get('id')}, was triggered.`);

      return Alert.findByName('instance-attached');
    }).then(alert ⇒ {
      return alert.trigger({
        meta: {
          notice: 'Just wanted to alert you to this.'
        }
      });
    }).catch(console.log);

## Design

  * Provides direct platform calls via client a well as a Polyseer.io Node.JS agent.
  * All client SDK calls return a Promise.
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
    * `(options = {}) ⇒ Client`
      * `options (Object)`
        - `.deduce (Boolean)` if the environment should be deduced from the environment when not supplied
        - `.env (String)` environment variable holding current environment
        - `.timeout (Number)` integer containing number of ms to wait for server responses
        - `.token (String)` environment variable holding current environment
        - `.token_env (String)` if no token is provided this environment variable will be checked for one
        - `.upsert_env (Boolean)` if an environment is not found it will be created and the SDK call retried
        - `.version (String)` api version to use
    * `.start(options = {}) ⇒ Client` generate a client and start an agent
      * `options (Object)` see () options, plus the additional below can be passed
        - `.agent (Object)` agent options (see client.startAgent options)
    * `.Color (Object)` platform color types
    * `.Determiner (Object)` expectation determiner types
    * `.Direction (Object)` instance direction types
    * `.Icon (Object)`  platform icon types
    * `.Protocol (Object)` alert protocol types
    * `.Strategy (Object)` instance attachment strategies
    * `.Subtype (Object)` instance subtypes
    * `.Type (Object)` resource types

### client

  * client
    * `.getCurrentEnvironment() ⇒ client.Environment`  Resolves the current environment **IF** it has been deduced.
    * `.startAgent(options = {}) ⇒ client`             Starts the Polyseer.io agent.
      * `options`
        - `.attach (Boolean)`
        - `.attach_strategy (Symbol)`
        - `.name (String)` instance name (will be used as a unique id)
        - `.description (String)` a description of this instance
        - `.group (String)` what group this instance belongs to
        - `.direction (polyseerio.Direction)` the monitoring direction (inbound) // force this
        - `.subtype (polyseerio.Subtype)` the instance subtype: periodic or long_running.
        - `.expectation` will be upserted for this instance
          - `.is_alive (Boolean)` create an expectation that this process is alive
        - `.fact`
          - `.architecture (Boolean)` the operating system architecture
          - `.cpu_count (Boolean)` the number of cores
          - `.endianess (Boolean)` if the architecture if little or big endian
          - `.free_memory (Boolean)` the current free memory
          - `.gid (Boolean)` the group if othe process is running under
          - `.home_directory (Boolean)` current user's home directory
          - `.hostname (Boolean)` the system hostname
          - `.launch_arguments (Boolean)` command used to launch the instance
          - `.node_version (Boolean)` the version of node being used
          - `.pid (Boolean)` the id of the process
          - `.platform (Boolean)` the operating platform of
          - `.title (Boolean)` the title of the process
          - `.uid (Boolean)` user id the process is running as
          - `.uptime (Boolean)` the uptime of the process
          - `.v8_version (Boolean)` the version of v8
        - `.metric`
          - `.cpu (Boolean)` track user and system cpu usage
          - `.memory (Boolean)` track memory usage
          - `.uptime (Boolean)` track process uptime
        - `.event`
          - `.start (Boolean)` event notice when agent starts
          - `.stop (Boolean)` event notice when agent stops
        - `.process`
          - `.SIGHUP (Boolean)` event notice when process receives SIGHUP
          - `.SIGINT (Boolean)` event notice when process receives SIGINT
          - `.SIGTERM (Boolean)` event notice when process receives SIGTERM
          - `.exit (Boolean)` event notice on process exit
          - `.uncaughtException (Boolean)` event notice on uncaught execptions
          - `.unhandledRejection (Boolean)` event notice on unhandled promise rejections
          - `.warning (Boolean)` event notice on process warning
    * Contains all of the enum values exported on polyseerio as well.
    
### Alert

  * .Alert
    * `.create(attributes = {}, options = {}) ⇒ client.Alert`
    * `.find(query = {}, options = {}) ⇒ client.Alert`
    * `.findById(id, options = {}) ⇒ [client.Alert]`
    * `.findByName(name, options = {}) ⇒ client.Alert`
    * `.remove(id, options = {})`
    * `.trigger(id, payload = {}, options = {}) ⇒ client.Alert`
    * `.update(id, updates = {}, options = {}) ⇒ client.Alert`
    * new **Alert**(attributes = {})
      * `.get(key) ⇒ Mixed`
      * `.remove() ⇒ this`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`
      * `.trigger(payload = {}) ⇒ this`

### Channel

  * .Channel
    * `.create(attributes = {}, options = {})`
    * `.find(query = {}, options = {})`
    * `.findById(id, options = {})`
    * `.findByName(name, options = {})`
    * `.message(id, content, options = {})`
    * `.remove(id, options = {})`
    * `.update(id, updates = {}, options = {})`
    * new **Channel**(attributes = {})
      * `.get(key) ⇒ Mixed`
      * `.message(content)`
      * `.remove()`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`

### Environment

  * .Environment
    * `.create(attributes = {}, options = {})`
    * `.find(query = {}, options = {})`
    * `.findById(id, options = {})`
    * `.findByName(name, options = {})`
    * `.message(id, content, options = {})`
    * `.remove(id, options = {})`
    * `.update(id, payload = {}, options = {})`
    * new **Environment**(attributes = {})
      * `.get(key) ⇒ Mixed`
      * `.message(content)`
      * `.remove()`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`

### Event

  * .Event
    * `.create(attributes = {}, options = {})`
    * `.find(query = {}, options = {})`
    * `.findById(id, options = {})`
    * new **Event**(attributes = {})
      * `.get(key) ⇒ Mixed`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`

### Expectation

  * .Expectation
    * `.check(id, options = {})`
    * `.create(attributes = {}, options = {})`
    * `.find(query = {}, options = {})`
    * `.findById(id, options = {})`
    * `.findByName(name, options = {})`
    * `.remove(id, options = {})`
    * `.update(id, updates = {}, options = {})`
    * new **Expectation**(attributes = {})
      * `.check()`
      * `.get(key) ⇒ Mixed`
      * `.remove()`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`

### Instance

  * .Instance
    * `.attach(options = {})`
    * `.create(attributes = {}, options = {})`
    * `.find(query = {}, options = {})`
    * `.findById(id, options = {})`
    * `.findByName(name, options = {})`
    * `.remove(id, options = {})`
    * `.update(id, updates = {}, options = {})`
    * new **Instance**(attributes = {})
      * `.addFact()`
      * `.addGauge()`
      * `.attach()`
      * `.fact()`
      * `.gauge()`
      * `.get(key) ⇒ Mixed`
      * `.remove()`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`

### Logic Block

  * .LogicBlock
    * `.create(attributes = {}, options = {})`
    * `.execute(id, options = {})`
    * `.find(query = {}, options = {})`
    * `.findById(id, options = {})`
    * `.findByName(name, options = {})`
    * `.remove(id, options = {})`
    * `.update(id, updates = {}, options = {})`
    * new **LogicBlock**(attributes = {})
      * `.execute()`
      * `.get(key) ⇒ Mixed`
      * `.remove()`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`

### Member

  * .Member
    * `.create(attributes = {}, options = {})`
    * `.find(query = {}, options = {})`
    * `.findById(id, options = {})`
    * `.remove(id, options = {})`
    * `.update(id, updates = {}, options = {})`
    * new **Member**(attributes = {})
      * `.get(key) ⇒ Mixed`
      * `.remove()`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`

### Settings

  * .Settings
    * `.retrieve()`
    * `.update(updates = {})`

### Task

  * .Task
    * `.create(attributes = {}, options = {})`
    * `.find(query = {}, options = {})`
    * `.findById(id, options = {})`
    * `.remove(id, options = {})`
    * `.update(id, updates = {}, options = {})`
    * new **Task**(attributes = {})
      * `.get(key) ⇒ Mixed`
      * `.remove()`
      * `.save() ⇒ this`
      * `.set(key, value, default = undefined) ⇒ this`
      * `.setProperties(object = {}) ⇒ this`

## Contributing

Always welcome to add, just open a PR.

## Testing

Testing requires:

  - Make
  - Grunt
  - nvm (if doing version testing)

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

### Version testing

    make version-testing

To test specific versions:

    make version-testing SUPPORTED=4.0.0 5.0.0 5.2.0

### All

    make test

## Debugging

In order to debug an issue is can be helpful to enable debug logging. To do
so set the environment variable: POLYSEERIO_LOG_LEVEL to debug.
