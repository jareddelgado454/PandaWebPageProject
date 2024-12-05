import { differenceInMinutes, format, isBefore } from "date-fns";
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

export const ThirdDateFormatter = (date) => {

    const createdAt = new Date(date);
    const currentDate = new Date();

    const differenceMs = currentDate - createdAt;
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return `Total days as technician: ${days} days`;

}

export const DateFormatterDateFns = (date = "") => format(new Date(date), "MMMM d, yyyy 'at' hh:mm a");

export const getTimeMessage = (scheduledStartDate) => {
    const now = new Date();
    const scheduledDate = new Date(scheduledStartDate);

    if (isBefore(now, scheduledDate) && differenceInMinutes(scheduledDate, now) <= 15) {
        const minutesLeft = differenceInMinutes(scheduledDate, now);
        return `Starting in ${minutesLeft} minute${minutesLeft === 1 ? '' : 's'}`;
    }

    return `${DateFormatterDateFns(scheduledStartDate)}`;
};