export class Page<T> {
    count: number;
    next: string;  
    previous: string;  
    results: Array<T>;

    constructor(results: Array<T>, count: number = 5, next: string = '6', previous: string = '1') {
        this.count = count;
        this.next = next;
        this.previous = previous;
        this.results = results;
    }
}