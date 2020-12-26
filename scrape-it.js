

module.exports = function(RED) {
    function scrape(config) {
        RED.nodes.createNode(this,config);
        this.mapping = config.mapping;
        var node = this;
        const scrapeIt = require('scrape-it')
        node.on('input', function(msg) {

            let html = msg.payload;
            mapping = msg.payload.mapping || node.mapping;
            mapping = JSON.parse(mapping);

            msg.payload = scrapeIt.scrapeHTML(html, mapping);
            node.send(msg);
        });
    }
    RED.nodes.registerType("scrape",scrape);
}