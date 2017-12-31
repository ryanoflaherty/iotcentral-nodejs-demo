"use strict";

// Use the Azure IoT device SDK for devices that connect to Microsoft IoT Central.
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var ConnectionString = require('azure-iot-device').ConnectionString;

var connectionString = 'HostName=saas-iothub-a7b48560-1162-4cb2-a905-40ab50c2b79d.azure-devices.net;DeviceId=1qqbfzt;SharedAccessKey=p/PUuYBrWkBga22grolynFaHL4O2bNiCBmeSK/OXT9Q=';
var targetTemperature = 0;
var client = clientFromConnectionString(connectionString);

// Send device telemetry.
function sendTelemetry() {
  var temperature = targetTemperature + (Math.random() * 15);
  var humidity = 70 + (Math.random() * 10);
  var pressure = 90 + (Math.random() * 5);
  var data = JSON.stringify({ temperature: temperature, humidity: humidity, pressure: pressure });
  var message = new Message(data);
  client.sendEvent(message, (err, res) => console.log(`Sent message: ${message.getData()}` +
    (err ? `; error: ${err.toString()}` : '') +
    (res ? `; status: ${res.constructor.name}` : '')));
}

// Send device properties.
function sendDeviceProperties(twin) {
  var properties = {
    serialNumber: '123-ABC',
    manufacturer: 'Contoso'
  };
  twin.properties.reported.update(properties, (err) => console.log(`Sent device properties; ` +
    (err ? `error: ${err.toString()}` : `status: success`)));
}

// Add any settings your device supports,
// mapped to a function that is called when the setting is changed.
var settings = {
  'fanSpeed': (newValue, callback) => {
      // Simulate it taking 1 second to set the fan speed.
      setTimeout(() => {
        callback(newValue, 'completed');
      }, 1000);
  },
  'setTemperature': (newValue, callback) => {
    // Simulate the temperature setting taking two steps.
    setTimeout(() => {
      targetTemperature = targetTemperature + (newValue - targetTemperature) / 2;
      callback(targetTemperature, 'pending');
      setTimeout(() => {
        targetTemperature = newValue;
        callback(targetTemperature, 'completed');
      }, 5000);
    }, 5000);
  }
};

// Handle settings changes that come from Microsoft IoT Central via the device twin.
function handleSettings(twin) {
  twin.on('properties.desired', function (desiredChange) {
    for (let setting in desiredChange) {
      if (settings[setting]) {
        console.log(`Received setting: ${setting}: ${desiredChange[setting].value}`);
        settings[setting](desiredChange[setting].value, (newValue, status, message) => {
          var patch = {
            [setting]: {
              value: newValue,
              status: status,
              desiredVersion: desiredChange.$version,
              message: message
            }
          }
          twin.properties.reported.update(patch, (err) => console.log(`Sent setting update for ${setting}; ` +
            (err ? `error: ${err.toString()}` : `status: success`)));
        });
      }
    }
  });
}

// Handle device connection to Microsoft IoT Central.
var connectCallback = (err) => {
  if (err) {
    console.log(`Device could not connect to Microsoft IoT Central: ${err.toString()}`);
  } else {
    console.log('Device successfully connected to Microsoft IoT Central');

    // Send telemetry measurements to Microsoft IoT Central every 1 second.
    setInterval(sendTelemetry, 1000);

    // Get device twin from Microsoft IoT Central.
    client.getTwin((err, twin) => {
      if (err) {
        console.log(`Error getting device twin: ${err.toString()}`);
      } else {
        // Send device properties once on device start up.
        sendDeviceProperties(twin);
        // Apply device settings and handle changes to device settings.
        handleSettings(twin);
      }
    });
  }
};

// Start the device (connect it to Microsoft IoT Central).
client.open(connectCallback);