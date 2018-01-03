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
    * Device explorer > [DeviceTemplateName] > + New > Real

## Node.js - Local Machine (Client)
1. Create Node.js project 
    ```bash
    npm init
    npm install azure-iot-device azure-iot-device-mqtt --save
    ``` 
2. Add code from MS demo page
3. Replace connection string
4. Run the app
    ```bash
    node index.js
    ```

## Node.js - RaspberryPi-Python (Client)
1. Need to install latest version of Raspbian - Stretch
2. Update/upgrade
    ```bash
    sudo apt-get update
    sudo apt-get upgrade
    ```
3. Download and unzip package from [MS github](https://github.com/Microsoft/microsoft-iot-central-firmware/releases)
4. Install python libraries for sense hat (not included in description)
    ```bash
    sudo apt-get install python-sense-emu python3-sense-emu sense-emu-tools 
    ```
5. Lots of errors...