export namespace formatDate {
  /**
   * @returns 2020.12.14
   */
  export function getFormatDate(): string {
    const date = new Date();
    const formatDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

    return formatDate;
  }
}
