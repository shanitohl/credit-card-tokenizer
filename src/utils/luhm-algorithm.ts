export const luhnCheck = async (cardNumber: string): Promise<boolean> => {
  let sum = 0;
  let doubleUp = false;
  const digits = cardNumber.split("").map(Number).reverse();
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (doubleUp) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleUp = !doubleUp;
  }
  return sum % 10 === 0;
};
