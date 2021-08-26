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

  export function calculateDate(dateTime: Date) {
    const date = new Date().getTime() - new Date(dateTime).getTime();
    let dateDiff = ``;
    if (date >= 60000) {
      dateDiff = `${Math.floor(date / 60000)} minutes ago`;
    }
    if (date >= 3600000) {
      dateDiff = `${Math.floor(date / 3600000)} hours ago`;
    }
    if (date >= 86400000) {
      dateDiff = `${Math.floor(date / 86400000)} days ago`;
    }
    if (date >= 2592000000) {
      dateDiff = `${Math.floor(date / 2592000000)} months ago`;
    }
    if (date >= 31536000000) {
      dateDiff = `${Math.floor(date / 31536000000)} years ago`;
    }
    return dateDiff;
  }
}
