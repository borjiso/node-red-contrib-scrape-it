

module.exports = function(RED) {
    function scrape(config) {
        RED.nodes.createNode(this,config);
        this.mapping = config.mapping;
        this.sourceProperty = config.sourceProperty;
        this.targetProperty = config.targetProperty;
        var node = this;
        const scrapeIt = require('scrape-it')
        node.on('input', function(msg) {
            source = RED.util.getMessageProperty(msg, this.sourceProperty);
            mapping = JSON.parse( node.mapping );
            try {
                let result =  scrapeIt.scrapeHTML(source, mapping);
                RED.util.setMessageProperty(msg, this.targetProperty, result, true);
              } catch(err){
                node.error(`error occurred while setting the target property${this.targetProperty}: ${err}`);
                node.status({fill:'red', shape:'ring',text:`Error applying the target property:${this.targetProperty}`});
                return;
              }
            node.send(msg);
        });
    }
    RED.nodes.registerType("scrape",scrape);
}
