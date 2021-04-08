const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const client = context.getTwilioClient();
  const callSid = event.callSid;
  const callerId = event.callerId;
  const destination = event.destination;
  console.log('Transfer call from:', callerId, 'to:', destination);
  
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const twiml = `<Response>
                <Say>Please hold while we transfer your call</Say>
                <Dial callerId='${callerId}'>${destination}</Dial>
                </Response>`;

  try {
    let call = await client.calls(callSid).update({twiml: twiml});

    console.log(JSON.stringify(call));
    response.appendHeader('Content-Type', 'application/json');
    response.setBody(call);
    callback(null, response);
  }
  catch (err) {
    response.appendHeader('Content-Type', 'plain/text');
    response.setBody(err.message);
    console.log(err.message);
    response.setStatusCode(500);
    callback(null, response);

  }
});