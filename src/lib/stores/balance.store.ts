import { writable } from 'svelte/store';

export const balanceStore = writable<bigint>(0n);
