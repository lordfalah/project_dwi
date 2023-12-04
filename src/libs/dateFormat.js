const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function convertDateFormat(dateTimeString) {
  if (!dateTimeString) return false;
  const date = new Date(dateTimeString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Fungsi untuk menambahkan ekstensi pada tanggal (1st, 2nd, 3rd, dst.)
  function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + "th";
    }
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }

  const formattedDate = `${month} ${getDayWithSuffix(day)}, ${year}`;
  return formattedDate;
}

export function convertToCustomFormat(inputDateString) {
  const dateParts = inputDateString.split(" ");
  const monthIndex = months.findIndex((month) => month === dateParts[0]) + 1;
  const day = parseInt(dateParts[1]);
  const year = parseInt(dateParts[2]);

  const date = new Date(year, monthIndex - 1, day);

  const formattedDate = date.toString();
  return formattedDate;

  // Output: Mon Dec 04 2023 01:00:00 GMT+0700 (Western Indonesia Time)
}
