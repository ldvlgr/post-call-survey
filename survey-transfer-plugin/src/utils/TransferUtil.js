import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

class TransferUtil {
  surveyTransfer = async (callSid, callerId) => {
    const destination = '+17192662837';
    console.debug('Transfer call SID:', callSid, ' from:', callerId, 'to:', destination);
    const fetchUrl = `${process.env.REACT_APP_SERVICE_BASE_URL}/survey-transfer/external-transfer`;
  
    const fetchBody = {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      callSid,
      callerId,
      destination
    };
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(fetchBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
  
    let call;
    try {
      const resp = await fetch(fetchUrl, fetchOptions);
      call = await resp.json();
      console.debug('Call data', call);
    } catch (error) {
      console.error(`Error transferring call SID ${callSid}.`, error);
    }
  
    return call;
  }

}

const transferUtil = new TransferUtil();

export default transferUtil;
