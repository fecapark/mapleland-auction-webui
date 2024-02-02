import { PriceData } from "@/server/actions";

export const getAveragePrice = (data: PriceData[]) => {
  if (data.length === 0) return 0;

  let sum = 0;
  let length = 0;

  data.forEach((priceData) => {
    priceData.costs.forEach((costData) => {
      sum += costData.cost;
      length += 1;
    });
  });

  return Math.floor(sum / length);
};

export const getMaxPrice = (data: PriceData[]) => {
  if (data.length === 0) return 0;

  let max = 0;

  data.forEach((priceData) => {
    priceData.costs.forEach((costData) => {
      if (costData.cost > max) max = costData.cost;
    });
  });

  return max;
};

export const getMinPrice = (data: PriceData[]) => {
  if (data.length === 0) return 0;

  let min = Infinity;

  data.forEach((priceData) => {
    priceData.costs.forEach((costData) => {
      if (costData.cost < min) min = costData.cost;
    });
  });

  return min;
};

export const getFrequentPrice = (data: PriceData[]) => {
  const countInRangeFor = (currentPrice: number) => {
    let count = 0;
    const minRange = currentPrice * (1 - offsetPercentage);
    const maxRange = currentPrice * (1 + offsetPercentage);

    data.forEach((priceData) => {
      priceData.costs.forEach((costData) => {
        const price = costData.cost;

        if (price >= minRange && price <= maxRange) {
          count += 1;
        }
      });
    });

    return count;
  };

  const offsetPercentage = 0.05;

  if (data.length === 0) return 0;

  const frequents: number[] = [];
  const prices: number[] = [];

  data.forEach((priceData) => {
    priceData.costs.forEach((costData) => {
      const currentPrice = costData.cost;
      frequents.push(countInRangeFor(currentPrice));
      prices.push(currentPrice);
    });
  });

  const max = Math.max(...frequents);
  const index = frequents.indexOf(max);
  return prices[index];
};
