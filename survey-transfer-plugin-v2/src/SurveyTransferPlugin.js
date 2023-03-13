import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import reducers, { namespace } from './states';
import SurveyButton from '../src/components/SurveyButton';
import TransferUtil from './utils/TransferUtil';

const PLUGIN_NAME = 'SurveyTransferPlugin';

export default class SurveyTransferPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    //Survey transfer button for agent-initiated post-call survey transfer
    flex.CallCanvasActions.Content.add(
      <SurveyButton icon="Eye" key="survey_transfer_button"></SurveyButton>
    );//

    //Automatic transfer to Survey IVR
    flex.Actions.addListener('beforeHangupCall', async (payload) => {
      const isInboundTask = payload.task.attributes.direction === 'inbound';
      //Inbound only
      if (isInboundTask) {

        //add logic to check survey attribute (set in IVR Studio flow)
        //if (payload.task.attributes.survey == 'true') {

        console.log('Before Hangup Call');
        const callSid = payload.task.attributes.call_sid;
        const callerId = payload.task.attributes.to;
        console.log('Survey transfer started: ' + callSid);
        await TransferUtil.surveyTransfer(callSid, callerId);
        //}
      }
    });

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
