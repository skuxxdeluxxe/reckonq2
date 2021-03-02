const _ = require('lodash');

const range = (length) => [...Array(length).keys()];

const locateSubTextInSentence = (sentence, subText) => {
    var locations = _.reduce(sentence, (positions, _letter, sentenceIndex) => {
        var subTextIndex = range(subText.length);
        var completeMatch = _.every(subTextIndex, (index) => sentence[sentenceIndex + index].toLowerCase() === subText[index].toLowerCase());
        if (completeMatch) { 
            positions.push(sentenceIndex + 1)
        }
        return positions;
    }, []);
    const result = { 'subtext': subText, 'result': locations } 
    return result
}

const locate = (textToSearch, subTexts) => {
    const sentence = textToSearch.text;
    const texts = subTexts.subTexts;

    results = _.map(texts, (subText) => locateSubTextInSentence(sentence, subText));
    const response = {
        candidate: 'Shantanu Padhye',
        text: sentence,
        results: results
    }
    return response;
}

module.exports = {
    locate: locate
}