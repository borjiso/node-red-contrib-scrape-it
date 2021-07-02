

module.exports = function(RED) {
    function scrape(config) {
        RED.nodes.createNode(this,config);
        this.mapping = config.mapping;
        var node = this;
        const scrapeIt = require('scrape-it')
        node.on('input', function(msg) {

            let html = msg.payload;

            mapping = msg.mapping ? msg.mapping : JSON.parse( node.mapping );
            msg.payload = {html: msg.payload, scrapped: scrapeIt.scrapeHTML(html, mapping)};
            node.send(msg);
        });
    }
    RED.nodes.registerType("scrape",scrape);
}