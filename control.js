var widget;
var bbm;
var currentSection = 0;
var gameOver = false;
var todaysRandom = new Math.seedrandom(new Date().toDateString());

//This really doesnt need to be an array 
// but it handles the case of no time out being present and any potential bugged state well enough
var timeouts = [];

function clearAllTimeouts() {
    while (timeouts.length != 0) {
        clearTimeout(timeouts.pop());
    }
}

function randomBBM() {
    return bbms[Math.floor(todaysRandom() * bbms.length)];
}

function bbmNums() {
    return bbms.map(bbm => bbm.num);
}

function createEmbed(trackId) {
    return '<iframe hidden width="100%" height="300" scrolling="yes" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' +
        String(trackId) + '&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>';
}

function gameEnd() {
    gameOver = true;
    $('#bbms').hide();
    range(6).forEach(i => $(`#Section${i}`).prop('disabled', false));
    $('iframe').removeAttr('hidden');
    clearAllTimeouts();
    widget.seekTo(0);
    widget.play();
}

function right() {
    var message = $('#message');
    message.text('Nice job!');
    message.addClass('right');
    gameEnd();
}

function wrong() {
    if (currentSection == 5) {
        var message = $('#message');
        message.text('You were wrong >:(');
        message.addClass('wrong');
        gameEnd();
        return;
    }
    currentSection++;
    $(`#Section${currentSection}`).prop('disabled', false);
    widget.pause();
    clearAllTimeouts();
    console.log(timeouts);
}

function playAtPosition(position) {
    widget.seekTo(position);
    widget.play();
    clearAllTimeouts();
    if (!gameOver)
        timeouts.push(setTimeout(() => widget.pause(), 10000));
}

$(document).ready(function() {
    bbm = randomBBM();
    console.log(bbm.num);
    $('div#placeholder').html(createEmbed(bbm.trackId));
    widget = SC.Widget(document.querySelector('iframe'));
    range(6).forEach(i => {
        var seekPos = (timeToMillis(bbm.lengthStr) - 10000) * todaysRandom();
        newButton = $(document.createElement('button')).prop({
            type: 'button',
            id: `Section${i}`,
            innerHTML: `Section ${i}`
        });
        newButton.on('click', () => playAtPosition(seekPos));
        if (i != 0) {
            newButton.prop('disabled', true);
        }
        $('#sections').append(newButton);
    });

    // $('#playpause').on('click', toggle);
    bbmNums().forEach(bbmNum => {

        newButton = $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: bbmNum
        });
        $('#bbms').append(newButton);

        newButton.on('click', bbmNum == bbm.num ? right : wrong);
    });

    newButton = $(document.createElement('button')).prop({
        type: 'button',
        innerHTML: 'Skip'
    });
    newButton.on('click', wrong);
    $('#bbms').append(newButton);
});