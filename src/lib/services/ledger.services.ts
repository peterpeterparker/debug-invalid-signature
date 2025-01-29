import { createAgent, isNullish } from '@dfinity/utils';
import { CONTAINER, DEV } from '$lib/constants/app.constants';
import { AccountIdentifier, LedgerCanister } from '@dfinity/ledger-icp';
import { AnonymousIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { balanceStore } from '$lib/stores/balance.store';

export const loadBalance = async ({ owner }: { owner: string | undefined | null }): Promise<void> => {
	if (isNullish(owner)) {
		balanceStore.set(0n);
		return;
	}

	const agent = await createAgent({
		identity: new AnonymousIdentity(),
		...(DEV && { host: CONTAINER, fetchRootKey: true })
	});

	const { accountBalance } = LedgerCanister.create({
		agent
	});

	const balance = await accountBalance({
		accountIdentifier: AccountIdentifier.fromPrincipal({ principal: Principal.fromText(owner) }),
		certified: true
	});
	balanceStore.set(balance);
};
