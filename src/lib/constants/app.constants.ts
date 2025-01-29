import { Principal } from '@dfinity/principal';

export const DEV = import.meta.env.DEV;
export const SATELLITE_ID = import.meta.env.VITE_SATELLITE_ID;
export const CONTAINER = import.meta.env.VITE_CONTAINER;

export const E8S_PER_ICP = 100_000_000n;

export const CMC_ID = Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai');
export const CONSOLE_ID = Principal.fromText('cokmz-oiaaa-aaaal-aby6q-cai');

export const TOP_UP_CANISTER_MEMO = BigInt(0x50555054); // TPUP

export const ICP_FEE = 10_000n;
export const TOP_UP_VALUE = 10_000n;