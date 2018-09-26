module.exports = function getZerosCount(number, base) {
  // default values; lowest prime
  let primeNum = 2;
  let primePwr = 1;
  // get prime factor of base and its power with the slowest growth
  for (let i = 2; i <= base; i++){
    if (base % i == 0 && isPrime(i)){
      const primeTest = i;
      let baseCpy = base;
      let primeTestPwr = 0;
      while (baseCpy % primeTest == 0){
        baseCpy /= primeTest;
        primeTestPwr++;
      }
      const condition = checkGrowthRate(primeNum, primePwr, primeTest, primeTestPwr, base);
      if (condition) {
        primeNum = primeTest;
        primePwr = primeTestPwr;
      };
    }
  }
  // count primes
  let counter = Math.trunc(number / primeNum);
  let index = counter;
  while(index % primeNum != 0){
    index--;
  }
  for (let i = index; i > 0 ; i -= primeNum){
    index = i;
    while (index % primeNum == 0){
      index /= primeNum;
      counter++;
    }
  }
  // divide by primePwr to count appearances of factor with the slowest growth
  while (counter % primePwr != 0){
    counter--;
  }
  counter /= primePwr;
  return counter;
}

function isPrime(number){
  let counter = 0;
  for (let i = 1, len = Math.trunc(Math.sqrt(number)); i <= len; i++){
    if (number % i == 0){
      counter++;
    }
  }
  return counter == 1;
}

// returns true if primeNum in primePwr grows faster than primeTest in primeTestPwr when counting factorial
function checkGrowthRate(primeNum, primePwr, primeTest, primeTestPwr, base){
  if (primeNum == primeTest){
    return true;
  }
  let primeNumCounter = 0;
  let primeTestCounter = 0;
  for (let j = 1; j <= base; j++){
    let jCpy = j;
    while (jCpy % primeNum == 0){
      jCpy /= primeNum;
      primeNumCounter++;
    }
    jCpy = j;
    while (jCpy % primeTest == 0){
      jCpy /= primeTest;
      primeTestCounter++;
    }
  }
  const primeNumPowdCounter = Math.round(primeNumCounter / primePwr * 100) / 100;
  const primeTestPowdCounter = Math.round(primeTestCounter / primeTestPwr * 100) / 100;
  return primeNumPowdCounter >= primeTestPowdCounter;
}