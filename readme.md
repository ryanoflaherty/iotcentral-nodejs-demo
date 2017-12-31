# Azure IoT Central - Node.js Demo

View the Micsrosoft overview for Node.js [here](https://docs.microsoft.com/en-us/microsoft-iot-central/howto-connect-nodejs).

Note - this presumes a raspberry pi has already been setup and has node installed. Started with a local node project for testing. Deployed to raspi

## IoT Central Portal - Saas (Server)
1. Create IoT Central Project - [MS Link](https://apps.microsoftiotcentral.com/create)
2. Create device template in IoT Central Project
    * Application builder
    * Create template > custom
    * Add telemetry, device properties, settings for device template
3. Prep for add device (less simple than it looks...) [link](https://docs.microsoft.com/en-us/microsoft-iot-central/tutorial-add-device)
    * Define new device type (Required, technically completed in step 2) [link](https://docs.microsoft.com/en-us/microsoft-iot-central/tutorial-define-device-type)
    * Add rules (optional) [link](https://docs.microsoft.com/en-us/microsoft-iot-central/tutorial-configure-rules)
    * Customize views (optional) [link](https://docs.microsoft.com/en-us/microsoft-iot-central/tutorial-customize-operator)
4. Add real device

## Node.js project - RaspberryPi (Client)
5. Create Node.js project 
    ```bash
    npm init
    npm install azure-iot-device azure-iot-device-mqtt --save
    ``` 
