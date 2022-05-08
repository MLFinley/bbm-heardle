function range(num) {
    return Array.from(Array(num).keys());
}

// https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
function millisToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
}

function timeToMillis(time) {
    var blocks = time.split(':').reverse();
    console.assert(blocks.length <= 3);
    var output = 0;
    for (var i = 0; i < blocks.length; i++) {
        output += parseInt(blocks[i]) * Math.pow(60, i);
    }
    output *= 1000;
    return output;
}

//https://stackoverflow.com/questions/563406/how-to-add-days-to-date
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}