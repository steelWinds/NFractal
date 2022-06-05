import type {ILSystemCmdUnit} from '@/interfaces/ILSystemCmdUnit';

class LSystemCmdUnit implements ILSystemCmdUnit {
  #cmdChar: ILSystemCmdUnit['cmdChar'];
  #cmdParams: ILSystemCmdUnit['cmdParams'];

  constructor(char: string, params?: [number[]]) {
    this.#cmdChar = char;
    this.#cmdParams = params ?? [];
  }

  get cmdChar(): ILSystemCmdUnit['cmdChar'] {
    return this.#cmdChar;
  }

  get cmdParams(): ILSystemCmdUnit['cmdParams'] {
    return this.#cmdParams;
  }
}

export default LSystemCmdUnit;
