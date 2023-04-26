// Convert number to roman numeral
// Creates an object as a reference with the Roman Numerals and their conversion in Arabic Numerals, then loop num within it.
// As long as num is greater than the current iteration in the roman Numerals, then add the Roman Numeral value, then subtract num by that value.
// Once num reaches 0, then we'll return the romanNumber string.
// Because of the way Roman Numerals subtracts itself when the value is 4 or 9, it's simpler to add it to the object than to create an arithmetic to check if there are no more than 3 of the same value.

function romanize(num) {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let romanNumber = "";
  let i;

  for (i in romanNumerals) {
    while (num >= romanNumerals[i]) {
      romanNumber += i;
      num -= romanNumerals[i];
    }
  }

  return romanNumber;
}

// Convert Roman Numeral to Arabic Numeral

function deromanize(roman) {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  roman = roman.toUpperCase().split("");
  let num = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    if (romanNumerals[roman[i]] < romanNumerals[roman[i + 1]]) {
      num -= romanNumerals[roman[i]];
    } else {
      num += romanNumerals[roman[i]];
    }
  }
  return num;
}
console.log(deromanize("XCVII"));
