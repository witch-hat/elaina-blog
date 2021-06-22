export namespace FormatUnifier {
  /**
   * @returns 2020.12.14 12:12
   * @returns 2020.1.5 05:05
   */
  export function getFullFormatDate(date: Date = new Date()): string {
    const hour: string = date.getHours() < 10 ? '0' + date.getHours() : date.getHours().toString();
    const minute: string = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString();

    const formatDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${hour}:${minute}`;

    return formatDate;
  }

  export function calculateDate(dateTime: number) {
    const date = new Date().getTime() - dateTime;
    let dateDiff = ``;
    if (date >= 60000) {
      dateDiff = `${(date / 60000).toFixed()} Minutes a go`;
    }
    if (date >= 3600000) {
      dateDiff = `${(date / 3600000).toFixed()} Hours a go`;
    }
    if (date >= 86400000) {
      dateDiff = `${(date / 86400000).toFixed()} Days a go`;
    }
    if (date >= 2592000000) {
      dateDiff = `${(date / 2592000000).toFixed()} Months a go`;
    }
    if (date >= 31536000000) {
      dateDiff = `${(date / 31536000000).toFixed()} Years a go`;
    }
    return dateDiff;
  }
}
