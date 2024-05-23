export const moveTowards = (start, end, fraction) => {
    return [
      start[0] + (end[0] - start[0]) * fraction,
      start[1] + (end[1] - start[1]) * fraction
    ];
};