// This file contains the meta data for the various big bootie mixes

bbms = [ //
    {
        num: 8,
        trackId: 225978333,
        lengthStr: '59:32',
    },
    {
        num: 9,
        trackId: 260059381,
        lengthStr: '1:00:03',
    },
    {
        num: 10,
        trackId: 286347553,
        lengthStr: '1:01:02',
    },
    {
        num: 11,
        trackId: 317238901,
        lengthStr: '1:01:02',
    },
    {
        num: 12,
        trackId: 341496235,
        lengthStr: '1:02:07',
    },
    {
        num: 13,
        trackId: 424743186,
        lengthStr: '1:00:30',
    },
    {
        num: 14,
        trackId: 512335119,
        lengthStr: '1:00:59',
    },
    {
        num: 15,
        trackId: 600383397,
        lengthStr: '1:00:07',
    },
    {
        num: 16,
        trackId: 694265923,
        lengthStr: '1:00:03',
    },
    {
        num: 17,
        trackId: 794640376,
        lengthStr: '1:00:39',
    },
    {
        num: 18,
        trackId: 917915269,
        lengthStr: '1:01:08',
    },
    {
        num: 19,
        trackId: 1041773563,
        lengthStr: '1:01:06',
    },
    {
        num: 20,
        trackId: 1147699540,
        lengthStr: '1:00:53',
    },

]

randomBBM = function() {
    return bbms[Math.floor(Math.random() * bbms.length)];
}

bbmNums = function() {
    return bbms.map(bbm => bbm.num);
}

createEmbed = function(trackId) {
    return '<iframe hidden width="100%" height="300" scrolling="yes" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' +
        String(trackId) + '&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>';
}