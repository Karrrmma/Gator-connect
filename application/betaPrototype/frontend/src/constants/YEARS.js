// inclusive, populate school start years within this range
function createYears(start, end) {
    const years = []; 
    for (let i = start; i <= end; i++) {
        years.push(i);
    }
    return years;
}

export const YEARS = createYears(2015, 2024);