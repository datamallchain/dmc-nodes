const dmc = require('chain');
const config = require("./config.json")
console.notice("start dmc producer node");
const DMC = require('dmc.js')
let keys = "";
while (true) {
    keys = console.readLine("input the producer-name:private-key! oooo:xxxx\n");
    if (keys) break;
}

let public_key = "";
let private_key = "";
let producername = "";
keys = keys.split(":");
producername = keys[0];
private_key = keys[1];

public_key = DMC.ecc.privateToPublic(private_key);
dmc.config_dir = config.config_dir;
dmc.data_dir = config.data_dir;
dmc.pubkey_prefix = config.pubkey_prefix;
dmc.name = config.initial_name;

let chain_config = {
    "contracts-console": true,
    'chain-state-db-size-mb': 8 * 1024,
    "genesis-json": "genesis.json"
};

console.notice("config_dir:", dmc.config_dir);
console.notice("data_dir:", dmc.data_dir);

dmc.load("http", {
    "http-server-address": `0.0.0.0:${config.http_port}`,
    "access-control-allow-origin": "*",
    "http-validate-host": false,
    "verbose-http-errors": true
});

dmc.load("net", {
    "max-clients": 100,
    "p2p-peer-address": config.p2p_peer_address,
    "p2p-listen-endpoint": `0.0.0.0:${config.p2p_port}`
});

dmc.load("producer", {
    'producer-name': producername,
    'private-key': JSON.stringify([public_key, private_key])
});

dmc.load("chain", chain_config);
dmc.load("chain_api");
dmc.load("producer_api");

dmc.start()