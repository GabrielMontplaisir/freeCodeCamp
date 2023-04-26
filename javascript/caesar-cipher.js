// Relies on two functions to work properly.
// The first takes a string, change it to Uppercase and replace the uppercase letters (pulled from RegEx).

function rot13(str) {
  const decipheredString = str.toUpperCase().replace(/[A-Z]/g, decipher);
  return decipheredString;
}

// Each character is passed through the decipher function.

function decipher(char) {
  const tmp = char.charCodeAt(); // Find the character code
  return String.fromCharCode(tmp + 13 > 90 ? tmp - 13 : tmp + 13); // If the character code would add up over 90 (Z), then subtract 13. Otherwise, add 13.
}
