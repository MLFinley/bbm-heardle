var widget;
var bbm;
var randomPos;

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

function right() {
    var message = $('#message');
    message.text('Nice job!');
    message.addClass('right');

}

function wrong() {
    var message = $('#message');
    message.text('You were wrong >:(');
    message.addClass('wrong');
}

function toggle() {
    var seekPos = (timeToMillis(bbm.lengthStr) - 30000) * randomPos;
    widget.seekTo(seekPos);
    console.log(millisToTime(seekPos));
    widget.toggle();
}

$(document).ready(function() {
    bbm = randomBBM();
    console.log(bbm.num);
    $('div#placeholder').html(createEmbed(bbm.trackId));
    widget = SC.Widget(document.querySelector('iframe'));
    randomPos = Math.random();

    $('#playpause').on('click', toggle);
    bbmNums().forEach(bbmNum => {

        newButton = $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: bbmNum
        });

        $('.btn-group').append(newButton);

        newButton.on('click', bbmNum == bbm.num ? right : wrong);
        newButton.on('click', () => $('iframe').removeAttr('hidden'));
    });
});