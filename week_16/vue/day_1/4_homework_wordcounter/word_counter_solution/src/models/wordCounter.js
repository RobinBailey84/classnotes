const WordCounter = function (phrase) {
  const splitPhrase = phrase.split(" ");
  const totalWords = splitPhrase.length;
  return totalWords;
};

export default WordCounter
