import React from 'react';
import { withTaskContext, IconButton } from '@twilio/flex-ui';
import TransferUtil from '../utils/TransferUtil';

class SurveyButton extends React.Component {
    directTransfer = () => {
        const callSid = this.props.task.attributes.call_sid;
        const callerId = this.props.task.attributes.to;
        console.log('Survey Button clicked ' + callSid);
        TransferUtil.surveyTransfer(callSid, callerId);
    }

    render() {
        return <IconButton 
            icon="Bulb"
            title="Survey"
            onClick={() => { this.directTransfer() }} />;
    }
}

export default withTaskContext(SurveyButton);