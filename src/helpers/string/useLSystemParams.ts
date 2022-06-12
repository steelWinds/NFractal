import re from '@/helpers/regexp/r_list';

const useLSystemParams = (fn: Function, m: string) => {
  const params = m.match(re.Numbers)?.map(Number);

  if (!params || !params.length) {
    return '';
  };

  return fn?.(params);
};

export {useLSystemParams};
