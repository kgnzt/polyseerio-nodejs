const polyseerio = require('../');

/**
 * In this example, we attach to Polyseer.io,
 * start sending an additional metric, and trigger
 * and event.
 */

/**
 * Returns a random number.
 *
 * @return {number}
 */
function random () {
  return (Math.round(Math.random() * 100) + 1);
}

return polyseerio.start().
  then(client => {
    const { Color,
            Event,
            instance } = client;

    instance.addGauge('random', random);

    return Event.create({
      name: `${instance.name} is not sending random data.`,
      color: Color.PURPLE,
      icon: Icon.SIGNAL
    });
  }).then(event => {
    console.log('ok');
  });
