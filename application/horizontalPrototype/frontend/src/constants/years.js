// inclusive, populate years within a range
function createYears(start, end) {
    const years = []; 
    for (let i = start; i <= end; i++) {
        years.push(i);
    }
    return years;
}

export const YEARS = createYears(2020, 2024);