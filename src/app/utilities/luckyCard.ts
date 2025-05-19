export function generateCardNumber(total: number) {
  const card = [];
  for (let i = 1; i <= total; i++) {
    card.push(i);
  }
  return card;
}
