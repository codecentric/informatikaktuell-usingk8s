export class DocumentData {
  constructor(title: string = '', content: string = '', id?: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  public id: string;
  public title: string;
  public content: string;

  toString() {
    let stripped = this.content;
    if (this.content) {
      stripped = this.content.substr(0, 10);
    }

    return `DocumentData (title: ${this.title}, content: ${stripped})`;
  }

  /**
   * checks wether title and content are defined.
   * @returns {boolean}
   */
  isValid(): boolean {
    return !(!this.title || !this.content);
  }
}
