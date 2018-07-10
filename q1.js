// Given an array of prices for a week, e.g. [3, 0, 14, 32, 30, 2, 5]
// You must buy earlier in the week, and sell at a later date.
// Return an array of two indices, e.g. [1, 3] in the previous example
// which returns the maximum buy and sell price. 
//
const assert = require('assert');
let prices = [3, 0, 14, 32, 30, 2, 5];

const findBuySellIndicesForMaxProfit = function findBuySellIndicesForMaxProfit(prices) {
  let sortedPrices = prices.slice().sort((a,b) => {return a - b});
  // if reversing the sorted array gives back exactly the original array, then 
  // we can't profit because it is a non-increasing array. return null
  try {
    assert.deepEqual(sortedPrices.reverse(), prices); 
  } catch (e) {
    sortedPrices.reverse();
    
    // pointers to narrow down from the front/back
    let frontIndex = 0;
    let backIndex = sortedPrices.length - 1;

    // we always want to buy at the lowest possible price
    // and sell at the highest possible price
    let buyIndex = prices.indexOf(sortedPrices[frontIndex]);
    let sellIndex = prices.indexOf(sortedPrices[backIndex]);
    
    while (buyIndex > sellIndex) {
      // move the buy/sell indexes in the direction that gives the maximum profit
      // by checking the difference and taking the smaller difference
      let frontDifference = sortedPrices[frontIndex + 1] - sortedPrices[frontIndex];
      let backDifference = sortedPrices[backIndex] - sortedPrices[backIndex - 1];
      if (frontDifference > backDifference) {
        backIndex--;
        sellIndex = prices.indexOf(sortedPrices[backIndex]);
      } else if (frontDifference < backDifference) {
        frontIndex++;
        buyIndex = prices.indexOf(sortedPrices[frontIndex]);
      } else {
        // they both have the same difference, so advance both
        frontIndex++;
        buyIndex = prices.indexOf(sortedPrices[frontIndex]);
        backIndex--;
        sellIndex = prices.indexOf(sortedPrices[backIndex]);
      }
    }

    return [buyIndex, sellIndex];
  }
  return null;
}

assert.deepEqual(findBuySellIndicesForMaxProfit(prices), [1, 3]);
assert.deepEqual(findBuySellIndicesForMaxProfit([70,35,2,60,34,1]), [2, 3]);
// if you can't make a profit at all (which is the same as buying/selling on the same day), return null;
assert.deepEqual(findBuySellIndicesForMaxProfit([1,0,0]), null);
assert.deepEqual(findBuySellIndicesForMaxProfit([5,4,3,2,1]), null);
