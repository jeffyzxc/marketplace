export const market_blockchain = ['1', 'true', 't'].includes((process.env.VUE_APP_FEATURE_FLAG_MARKET_USE_BLOCKCHAIN + '').toLowerCase());

export const stakeOnly = ['1', 'true', 't'].includes((process.env.VUE_APP_STAKING_ONLY + '').toLowerCase());