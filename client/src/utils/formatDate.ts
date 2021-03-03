export namespace FormatUnifier {
  export class FormatDate {
    /**
     * @returns 2020.12.14 12:12
     */
    getFullFormatDate(date: Date = new Date()): string {
      const formatDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

      return formatDate;
    }
  }
}
