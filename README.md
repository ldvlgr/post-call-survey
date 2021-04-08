# Post-Call Survey Transfer Twilio Flex Plugin

## Flex Plugin
Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## How it works
This Flex plugin adds an automatic transfer to an external number when the agent Hangs Up the call. The call transfer is invoked from the beforeHangupCall event handler.  This functionality can be used in conjunction with a Studio IVR flow where caller would be prompted to opt into taking a post-call survey.  The studio flow would have to set a task attribute that can be checked in the beforeHangupCall event handler.

This plugin leverages a Twilio functions to perform the actual call transfer.

The application repo contains both a Flex Plugin project as well as a Twilio Serverless project.  Deploy the Serverless function before deploying the Flex plugin.

# Configuration

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd survey-transfer-plugin
npm install
cd ..
cd serverless
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```
or
```bash
npm install twilio-cli -g
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

Install the [Serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-serverless
```

## Serverless Functions

### Deployment

```bash
cd serverless
twilio serverless:deploy
```
After successfull deployment you should see at least the following:
```bash
✔ Serverless project successfully deployed
Functions:
   https://<your base url>/survey-transfer/external-transfer
   
```

Your function will now be present in the Twilio Functions Console and part of the "post-call-survey" service. Copy the URL from one of the functions. 

## Flex Plugin

### Development

Create the plugin config file by copying `.env.example` to `.env` 

```bash
cd survey-transfer-plugin
cp .env.example .env
```

Edit `.env` and set the REACT_APP_SERVICE_BASE_URL variable to your Twilio Functions base url (this will be available after you deploy your functions). In local development environment, it could be your localhost base url.

In order to develop locally, you can use the Twilio CLI to run the plugin locally. Using your commandline run the following from the root dirctory of the plugin.

```bash
cd survey-transfer-plugin
twilio flex:plugins:start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:3000`.

When you make changes to your code, the browser window will be automatically refreshed.


### Deploy Plugin

Once you are happy with your plugin, you have to deploy then release the plugin for it to take affect on Twilio hosted Flex.

Run the following command to start the deployment:

```bash
twilio flex:plugins:deploy --major --changelog "Notes for this version" --description "Functionality of the plugin"
```

After your deployment runs you will receive instructions for releasing your plugin from the bash prompt. You can use this or skip this step and release your plugin from the Flex plugin dashboard here https://flex.twilio.com/admin/plugins

For more details on deploying your plugin, refer to the [deploying your plugin guide](https://www.twilio.com/docs/flex/plugins#deploying-your-plugin).

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.


## Disclaimer