const shuffleQuestions = (array, numQuestions) => {
  return array
    .map((item, index, array) => {
      return array[Math.floor(Math.random() * array.length)];
    })
    .filter((item, index, array) => {
      return index === array.indexOf(item);
    })
    .slice(0,numQuestions);
};

export default shuffleQuestions;
