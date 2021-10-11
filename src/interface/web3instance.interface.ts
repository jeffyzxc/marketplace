export interface IWeb3Instance {
    currentProvider:   CurrentProvider;
    _requestManager:   string;
    givenProvider:     string;
    providers:         string;
    _provider:         string;
    setProvider:       string;
    setRequestManager: string;
    BatchRequest:      string;
    extend:            string;
    version:           string;
    utils:             string;
    eth:               any;
    shh:               string;
    bzz:               string;
}

export interface CurrentProvider {
    _events:                   Events;
    _eventsCount:              number;
    _maxListeners:             number;
    _log:                      Log;
    _state:                    string;
    selectedAddress:           string;
    chainId:                   string;
    _handleAccountsChanged:    string;
    _handleConnect:            string;
    _handleChainChanged:       string;
    _handleDisconnect:         string;
    _handleStreamDisconnect:   string;
    _handleUnlockStateChanged: string;
    _rpcRequest:               string;
    request:                   string;
    _jsonRpcConnection:        string;
    _rpcEngine:                string;
    _sentWarnings:             string;
    networkVersion:            string;
    isMetaMask:                string;
    _sendSync:                 string;
    enable:                    string;
    send:                      string;
    sendAsync:                 string;
    _warnOfDeprecation:        string;
    _metamask:                 string;
}

export interface Events {
    connect: null[];
}

export interface Log {
    levels:     Levels;
    info:       string;
    warn:       string;
    error:      string;
    log:        string;
    getLogger:  string;
    noConflict: string;
    getLoggers: string;
}

export interface Levels {
    TRACE:  number;
    DEBUG:  number;
    INFO:   number;
    WARN:   number;
    ERROR:  number;
    SILENT: number;
}
