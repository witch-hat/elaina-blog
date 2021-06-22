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
    //const date = new Date().getTime() - dateTime.getTime(); -> dateTime.getTime이 함수가 아니라는데.. 이유를 당최 몰르겟읍니다..
    let dateDiff = ``;
    if (date >= 60000) {
      dateDiff = `${(date / 60000).toFixed()} Minutes Ago`;
    }
    if (date >= 3600000) {
      dateDiff = `${(date / 3600000).toFixed()} Hours Ago`;
    }
    if (date >= 86400000) {
      dateDiff = `${(date / 86400000).toFixed()} Days Ago`;
    }
    if (date >= 2592000000) {
      dateDiff = `${(date / 2592000000).toFixed()} Months Ago`;
    }
    if (date >= 31536000000) {
      dateDiff = `${(date / 31536000000).toFixed()} Years Ago`;
    }
    return dateDiff;
  }
}
