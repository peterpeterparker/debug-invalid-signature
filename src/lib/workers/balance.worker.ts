import type { PostMessageDataRequest, PostMessageSync } from '$lib/types/post-message';
import { unsafeIdentity } from '@junobuild/core';
import type { IdentityParams } from '$lib/types/identity';
import { createAgent } from '$lib/api/agent.api';
import { AccountIdentifier, LedgerCanister } from '@dfinity/ledger-icp';
import { Principal } from '@dfinity/principal';

onmessage = async ({ data: dataMsg }: MessageEvent<PostMessageSync<PostMessageDataRequest>>) => {
	const { msg, data } = dataMsg;

	if ('stop' === msg) {
		await stop();
		return;
	}

	if ('start' === msg) {
		await start(data);
	}
};

let timer: NodeJS.Timeout | undefined = undefined;

const stop = async () => {
	clearInterval(timer);
	timer = undefined;
};

const start = async (param: PostMessageDataRequest) => {
	const identity = await unsafeIdentity();

	const sync = async () => await fetchBalance({ identity, ...param });

	// We sync the cycles now but also schedule the update afterwards
	await sync();

	timer = setInterval(sync, 5000);
};

const fetchBalance = async ({ identity, owner }: IdentityParams & PostMessageDataRequest) => {
	const agent = await createAgent({ identity });

	const { accountBalance } = LedgerCanister.create({
		agent
	});

	const accountIdentifier = AccountIdentifier.fromPrincipal({
		principal: Principal.fromText(owner)
	});

	const [balanceUncertified, balanceCertified] = await Promise.all([
		accountBalance({
			accountIdentifier,
			certified: false
		}),
		accountBalance({
			accountIdentifier,
			certified: true
		})
	]);

	console.log('Worker balance:', balanceUncertified, balanceCertified);
};
