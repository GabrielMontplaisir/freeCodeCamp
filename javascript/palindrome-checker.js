// First method -- Using RegEx
// Remember that \W === [^A-Za-z0-9] -- We're checking for symbols, not for characters or words here.
// Since the underscore needs to match in certain cases, we're throwing it into the mix as well.

function palindrome(str) {
  let regEx = /[\W_]+/g; // Check whether there are (one or more) symbols in our string. Check the whole string using the 'g' flag.
  let target = str.toLowerCase().replace(regEx, ""); // Since strings are immutable, we're going to define a new string. Make it lowercase, then trim (replace) anything matched with the regEx.
  return target === target.split("").reverse().join(""); // Return true if the target matches its reversed version (split, reversed, then joined together)
}

// Second method -- Using a loop
// Starts like the first method, as we need to trim (replace) symbols from the string. From there however, everything is managed by the new string -> Target
// This one works because a palindrome is the same on each side. Therefore, you can split the string in half, and it should return true or false based on whether the letters match on either side.
// Loop an array for the first half of the string, then return false if the letters don't match at any point.

function palindrome(str) {
  let regEx = /[\W_]+/g;
  let target = str.toLowerCase().replace(regEx, "");

  for (let i = 0; i < target.length / 2; i++) {
    if (target[i] !== target[target.length - (i + 1)]) {
      return false;
    }
  }
  return true;
}
