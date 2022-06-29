const useSelectByChance = <T extends {chance: number}>(items: T[]): T => {
  const randomChance = Math.random();
  let offChance = 0;

  const selectItem = items.find((item) => {
    if (randomChance < (item.chance + offChance)) return true;

    offChance += item.chance;

    return false;
  });

  return selectItem ?? items[0];
};

export {useSelectByChance};
