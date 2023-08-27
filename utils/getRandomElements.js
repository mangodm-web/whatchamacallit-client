export function getRandomElements(array, numberOfElementsToPick = 1) {
  const results = new Set();

  while (results.size < numberOfElementsToPick) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];

    if (!results.has(randomElement)) {
      results.add(randomElement);
    }
  }

  return Array.from(results);
}
