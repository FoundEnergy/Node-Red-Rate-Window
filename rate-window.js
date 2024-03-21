module.exports = function (RED) {
    function RateWindowNode(config) {
      RED.nodes.createNode(this, config);
      var node = this;
      var interval = parseInt(config.interval) || 500;
      var prevTime = Date.now();
      node.on('input', function (msg) {
        var currentTime = Date.now();
  
        if (currentTime < prevTime + interval) {
          // Rate limit exceeded
          node.status({ fill: "red", shape: "dot", text: "Rate limit exceeded" });
          return;
        }
        else{
            node.status({ fill: "green", shape: "dot", text: "Request allowed" });
            prevTime = currentTime;
            node.send(msg);
        }

      });
    }
  
    RED.nodes.registerType("rate-window", RateWindowNode);
  };