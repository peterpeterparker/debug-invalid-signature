import { isNullish } from '@dfinity/utils';
import { AccountIdentifier, LedgerCanister } from '@dfinity/ledger-icp';
import { Principal } from '@dfinity/principal';
import { balanceStore } from '$lib/stores/balance.store';
import { unsafeIdentity } from '@junobuild/core';
import { createAgent } from '$lib/api/agent.api';

export const loadBalance = async ({
	owner
}: {
	owner: string | undefined | null;
}): Promise<void> => {
	if (isNullish(owner)) {
		balanceStore.set(0n);
		return;
	}

	const identity = await unsafeIdentity();

	const agent = await createAgent({ identity });

	const { accountBalance } = LedgerCanister.create({
		agent
	});

	const balance = await accountBalance({
		accountIdentifier: AccountIdentifier.fromPrincipal({ principal: Principal.fromText(owner) }),
		certified: true
	});
	balanceStore.set(balance);
};
