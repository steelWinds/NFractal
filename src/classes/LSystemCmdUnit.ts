import type {ILSystemCmdUnit} from '@/interfaces/ILSystemCmdUnit';

import re from '@/helpers/regexp/r_list';

class LSystemCmdUnit implements ILSystemCmdUnit {
  #cmd: ILSystemCmdUnit['char'];
  #cmdParams?: ILSystemCmdUnit['params'];

  constructor(char: string) {
    [this.#cmd, this.#cmdParams] = this.#separateCmdParams(char);
  }

  #separateCmdParams(char: string): [string, number[]] {
    const cmdChar = char.match(re.LSystemCharCmd)?.[0];
    const cmdParams = char.match(re.Numbers)?.map(Number);

    if (!cmdChar || !cmdParams?.length) {
      return [char, []];
    }

    return [cmdChar, cmdParams];
  }

  get char(): ILSystemCmdUnit['char'] {
    return this.#cmd;
  }

  get params(): ILSystemCmdUnit['params'] {
    return this.#cmdParams;
  }
}

export default LSystemCmdUnit;
