function sum_to_n_a(n: number): number {
    // This uses simple iteration and easiest to read and understand. 
    // O(1) For Memory, O(n) for Time
    if (n < 0) return 0;
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}

function sum_to_n_b(n: number): number {
    // This uses Gauss's formula. O(1) for both time and memory
    if (n < 0) return 0;
    return (n * (n + 1)) / 2;
}



function sum_to_n_c(n: number): number {
    // Standard Recursive Function.
    //O(n) for both time and memory. I would not use this.
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}

