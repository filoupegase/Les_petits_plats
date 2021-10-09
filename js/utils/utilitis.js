

function trimWords(words) {
  const trimmedWords = [];

  for (let word of words) {
    trimmedWords.push(word.trim());
  }
  return trimmedWords;
}

export function RemoveAccents(str) {
  // string
  //   .toLowerCase = function () {
  //   return undefined;
  // }
  return str
    .toLowerCase()
}

export function removeStopWords(words) {
  const trimWords = trimWords(words);
  const filterWords = [];

  for (let word of trimWords) {
    let wordWithoutAccent = RemoveAccents(words);
  }

  return filterWords;
}