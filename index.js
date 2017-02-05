/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');


const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'de-DE': {
        translation: {
            SKILL_NAME: 'Pizza oder Eintopf',
            GET_FACT_MESSAGE: 'Du willst ',
            HELP_MESSAGE: 'Sage einfach Pizza oder Eintopf',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Tschüss und einen schönen Tag!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', "Was geht?");
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        const itemSlotOne = this.event.request.intent.slots.itemOne.value;
        const itemSlotTwo = this.event.request.intent.slots.itemTwo.value;
        const slots = [itemSlotOne, itemSlotTwo];
        
        const factArr = slots;
        const factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        
        if (typeof randomFact === 'undefined') {
            randomFact = "keine Ahnung.";
            }
        
        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        
        //this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
        this.emit(':askWithCard', speechOutput, 'Eintopf?', this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
