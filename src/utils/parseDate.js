export const DateFormatter = (date) => {

    var dateParsed = new Date(date);

    return dateParsed.toLocaleDateString("en-US");

}