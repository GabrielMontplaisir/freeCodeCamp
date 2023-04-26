// Telephone number validator
// Done entirely through RegEx.
// Kind of tough to figure this one (especially when only one bracket showed up).

function telephoneCheck(str) {
  const regEx = /^1?[- ]*(\d{3}|\(\d{3}\))[- ]*\d{3}[- ]?\d{4}$/g;
  return regEx.test(str); // Return true if matches above
}

/* Breakdown in segments
 * ^ -- Start of string
 * 1? -- Check if there's a 1 at the start.
 * [- ]* -- Check if there's either a hyphen or a space. There can be one or both. This appears a few fimes
 * (\d{3}|\(\d{3}\)) -- Check for area code "as-is", or between (xxx)
 * [- ]* -- Check if there's either a hyphen or a space.
 * \d{3} -- Check for first three digits of phone #
 * [- ]? -- Check for a hyphen or a space.
 * \d{4} -- Check for last four digits of phone #
 * $ -- End of string
 * 'g' -- Add global flag for entire string.
 */
