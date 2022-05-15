class NotCreated extends ReferenceError {
  #errName: string;

  constructor(msg: string) {
    super(msg);

    this.#errName = this.constructor.name;
  }

  get name(): string {
    return this.#errName;
  }
}

export default NotCreated;
