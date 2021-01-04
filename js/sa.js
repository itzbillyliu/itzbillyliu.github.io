var SmartAsset = {
    settings: {
        allowResize: true,
        iframeId: 'sa-iframe',
        iframeHeight: 0,
        iframeWidth: 0,
        iframeSrc: '',
        windowWidth: 0,
    },
    bindListeners: function(){
        window.addEventListener('message', function(event){
            var resp = JSON.parse(event.data);
            SmartAsset.resizeContainer(resp.height);
        });

        window.addEventListener('resize', function(event){
            // only attempt to resize when we have a difference greater than 5 pixels
            var currentWidth = window.innerWidth;
            if(
                (currentWidth > settings.windowWidth && (currentWidth - settings.windowWidth) > 5) ||
                (settings.windowWidth > currentWidth && (settings.windowWidth - currentWidth) > 5)
            ){
                SmartAsset.getIframeSizes();
            }
        });
    },

    getIframeSizes: function(){
        var iframe = document.getElementById(settings.iframeId);
        iframe.contentWindow.postMessage(
            '{"height": ' + document.body.scrollHeight + '}',
            "*"
        );
    },

    getWindowSize: function(){
        settings.windowWidth = window.innerWidth;
    },

    resizeContainer: function(h){
        var iframe = document.getElementById(settings.iframeId);
        $(iframe).height(h);
    },

    init: function(){
        settings = this.settings;
        settings.iframeSrc = document.getElementById(settings.iframeId).getAttribute('src');
        SmartAsset.bindListeners();
        SmartAsset.getIframeSizes();
        SmartAsset.getWindowSize();
        console.log('\
Hi! Welcome to Billy Liu\'s sample for Smart Asset.\
\n\n\
This is a demo of cross-domain messaging being used to obtain heights for content within an iframe, in order to resize our local container to fit.\
\n\n\
Once the iframe has loaded, you are good to go. Enjoy!');
    },
}

$(document).ready(function () {
    // wait for iframe to load before we run processes to resize
    $('#sa-iframe').load(function(){
        SmartAsset.init();
    });
});