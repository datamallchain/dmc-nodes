let chain = require('chain');
let config = require('./config.json');

chain.config_dir = config.config_dir;
chain.data_dir = config.data_dir
chain.pubkey_prefix = config.pubkey_prefix;
chain.name = config.initial_name;

console.notice("config_dir:", chain.config_dir);
console.notice("data_dir:", chain.data_dir);


chain.load("http", {
    "http-server-address": `0.0.0.0:${config.http_port}`,
    "access-control-allow-origin": "*",
    "http-validate-host": false,
    "verbose-http-errors": true 
});

chain.load("net", {
    "p2p-peer-address": config.p2p_peer_address,
    "max-clients": 100,
    "p2p-listen-endpoint": `0.0.0.0:${config.p2p_port}`,
});

chain.load("producer", {
    'max-transaction-time': 3000,
});


chain.load("chain", {
    "contracts-console": true,
    "genesis-json": "genesis.json",
    "enable-account-queries": true
});

chain.load("chain_api");
chain.load("trace_api", {
    "trace-no-abis": "true"
});

chain.start();