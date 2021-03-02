const _ = require('lodash');

const range = (length) => [...Array(length).keys()];

const locateSubTextInSentence = (sentence, subText) => {
    var locations = [];
    var subTextRange = subText.length;
    for (var sentenceIndex = 0; sentenceIndex < sentence.length; sentenceIndex++) {
        var subTextIndex = range(subTextRange);
        var completeMatch = _.every(subTextIndex, (index) => sentence[sentenceIndex + index].toLowerCase() === subText[index].toLowerCase());
        if (completeMatch) { 
            locations.push(sentenceIndex + 1)
            sentenceIndex + subTextRange;
        }
    }
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