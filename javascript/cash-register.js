// Cash Register
// @param {number} price Price of "cart"
// @param {number} cash How much the person gave
// @param {array} cid How much cash is in the register
// Returns whether there is enough cash in the register, and how much exact change to give, with the exact coins and bills.

function checkCashRegister(price, cash, cid) {
  const CURRENCY_REF = {
    // Object Representing the different monetary values for the currencies
    "ONE HUNDRED": 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    NICKEL: 0.05,
    DIME: 0.1,
    PENNY: 0.01,
  };

  // Array to check exactly how much money is in the register. We then round to two decimal points.
  let totalCID = 0;
  for (let cash of cid) {
    totalCID += cash[1];
  }
  totalCID = totalCID.toFixed(2);

  // We verify how much change is required.
  let reqChange = cash - price;
  if (reqChange > totalCID) {
    return { status: "INSUFFICIENT_FUNDS", change }; // If the amount of change required is over the amount in the till.
  } else if (reqChange.toFixed(2) === totalCID) {
    return { status: "CLOSED", change: cid }; // If the amount of change is equal to the amount in the till, give the till's contents.
  }

  // Initiate an array to which we will push the exact coinage we will provide to customer.
  // We reverse it to make show larger bills first, and to subtract from it.
  let change = [];
  cid = cid.reverse();

  for (let curr of cid) {
    // For each kind of bill and coin in the till at the moment
    let temp = [curr[0], 0]; // Initiate a temporary element we will push to our array later.
    while (reqChange >= CURRENCY_REF[curr[0]] && curr[1] > 0) {
      // While the required change is over the value from our object & that amount is available in the till...
      temp[1] += CURRENCY_REF[curr[0]]; // Add the amount to our temporary value
      curr[1] -= CURRENCY_REF[curr[0]]; // Subtract that amount from our till
      reqChange -= CURRENCY_REF[curr[0]]; // Subtract the required change
      reqChange = reqChange.toFixed(2); // Round the required change to 2 decimal points.
    }

    // If money was added to our temporary element...
    // Push the amount with the type of bill / coin.
    if (temp[1] > 0) {
      change.push(temp);
    }
  }

  // Final check to see if there is still change required
  if (reqChange > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }; // Returns insufficient funds if that is the case.
  }

  // Return the amount of bills / coins provided.
  return { status: "OPEN", change };
}
