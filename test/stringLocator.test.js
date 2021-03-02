const expect = require('chai').expect
const stringLocator = require('../stringLocator');

describe('String Locator', () => {
    let sentence = 'Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!'

    describe('Locate SubText In Sentence', () => {
        describe('when a subtext is found in the sentence', () => {
            let subtext = 'Peter'
            let result = { 'subtext': subtext, 'result': [1,43,98] }
            it('should return an array with the positions of where the subtext was found', () => {
                expect(stringLocator.locateSubTextInSentence(sentence, subtext)).to.eql(result);
            });
        });

        describe('when a subtext is found in the sentence but the case is different', () => {
            let subtext = 'peter'
            let result = { 'subtext': subtext, 'result': [1,43,98] }
            it('should return an array with the positions of where the subtext was found irrespective of case', () => {
                expect(stringLocator.locateSubTextInSentence(sentence, subtext)).to.eql(result);
            });
        });

        describe('when a subtext is NOT found in the sentece', () => {
            let subtext = 'Z'
            let result = { 'subtext': subtext, 'result': [] }
            it('should return an empty array', () => {
                expect(stringLocator.locateSubTextInSentence(sentence, subtext)).to.eql(result);
            });
        });
    });

    describe('Locate', () => {
        let inputtedSentence = { 'text': sentence };
        let inputtedSubTexts = { 'subTexts': ['Peter', 'peter', 'z'] };
        let locations = [ { 'subtext': 'Peter', 'result': [1,43,98] }, { 'subtext': 'peter', 'result': [1,43,98] }, { 'subtext': 'z', 'result': [] }];
        let result = {
            candidate: 'Shantanu Padhye',
            text: sentence,
            results: locations
        };
        describe('when a sentence and a array of subtexts are provided', () => {
            it('should return a response object with the results', () => {
                expect(stringLocator.locate(inputtedSentence, inputtedSubTexts)).to.deep.equal(result);
            });
        });
    });
});