export function getRandomElements(array, numberOfElementsToPick = 1) {
  if (!Array.isArray(array)) {
    throw new TypeError("The first argument must be an array.");
  }
  if (
    typeof numberOfElementsToPick !== "number" ||
    !Number.isInteger(numberOfElementsToPick)
  ) {
    throw new TypeError(
      "The second argument should be a non-negative integer."
    );
  }
  if (numberOfElementsToPick < 0) {
    throw new RangeError(
      "The second argument should be a non-negative integer."
    );
  }

  if (array.length === 0 || numberOfElementsToPick === 0) {
    return [];
  }

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
