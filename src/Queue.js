function Queue() {
    this.elements = [];
}

Queue.prototype.push = function (e) {
    this.elements.push(e);
}

Queue.prototype.pop = function () {
    return this.elements.shift();
}

Queue.prototype.isEmpty = function () {
    return this.elements.length === 0;
}

Queue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
}

Queue.prototype.length = function () {
    return this.elements.length;
}

Queue.prototype.weeklySummary = function (total) {
    return (<ul>
        Weekly Summary of Hours Spent Working: {this.elements[0]} +
        {this.elements[1]} +
        {this.elements[2]} +
        {this.elements[3]} +
        {this.elements[4]} +
        {this.elements[5]} +
        {this.elements[6]} = {total} Hours
    </ul>)
}

export default Queue;