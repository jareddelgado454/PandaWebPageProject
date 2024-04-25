export const DateFormatter = (date) => {

    var dateParsed = new Date(date);

    return dateParsed.toLocaleDateString("en-US");

}

export const SecondDateFormatter = (date) => {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month} ${day}, ${year} ${hours}:${minutes} ${amOrPm}`;

}