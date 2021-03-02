const _ = require('lodash');

const locateSubTextInSentence = (sentence, subText) => {
    var locations = [];
    var subTextRange = subText.length;
    for (var sentenceIndex = 0; sentenceIndex < sentence.length; sentenceIndex++) {
        var completeMatch = true;
        for (var subTextIndex = 0; subTextIndex < subTextRange; subTextIndex++) {
            if(sentence[sentenceIndex + subTextIndex].toLowerCase() !== subText[subTextIndex].toLowerCase()){
                completeMatch = false;
                break;
            }
        }
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