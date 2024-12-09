class StringCalculator {
  add(numbers) {
    if (!numbers) return 0; // Rule: Empty string case

    let delimiter = /,|\n/; // Default delimiters (`,` or `\n`)

    // Handle custom delimiters
    if (numbers.startsWith('//')) {
      const match = numbers.match(/^\/\/(.*?)\n/);
      if (match) {
        const delimiterString = match[1];
        const delimiters = delimiterString.match(/\[(.*?)\]/g) || [delimiterString];
        delimiter = new RegExp(
          delimiters.map(d => d.replace(/[\[\]]/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
        );
        numbers = numbers.slice(match[0].length);
      }
    }

    const numArray = numbers.split(delimiter).map(Number);

    // Handle negative numbers
    const negatives = numArray.filter(n => n < 0);
    if (negatives.length) {
      throw new Error(`negatives not allowed: ${negatives.join(', ')}`);
    }

    // Ignore numbers greater than 1000
    return numArray.reduce((sum, num) => sum + (num > 1000 ? 0 : num), 0);
  }
}

module.exports = StringCalculator;
