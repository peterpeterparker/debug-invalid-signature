import { createAgent, nowInBigIntNanoSeconds, principalToSubAccount } from '@dfinity/utils';
import {
	CONTAINER,
	DEV,
	CONSOLE_ID,
	TOP_UP_CANISTER_MEMO,
	CMC_ID
} from '$lib/constants/app.constants';
import { AccountIdentifier, LedgerCanister, SubAccount } from '@dfinity/ledger-icp';
import type { Identity, HttpAgent } from '@dfinity/agent';
import { CMCCanister } from '@dfinity/cmc';

export const topUp = async ({ identity }: { identity: Identity }) => {
	const agent = await createAgent({
		identity,
		...(DEV && { host: CONTAINER, fetchRootKey: true })
	});

	const blockIndex = await sendIcp({ agent });

	console.log("Send ICP 👌");

	await notifyTopUp({
		agent,
		blockIndex
	});


	console.log("Notify top-up 👌");
};

const sendIcp = async ({ agent }: { agent: HttpAgent }): Promise<bigint> => {
	const { transfer } = LedgerCanister.create({
		agent
	});

	const toSubAccount = principalToSubAccount(CONSOLE_ID);
	const recipient = AccountIdentifier.fromPrincipal({
		principal: CMC_ID,
		subAccount: SubAccount.fromBytes(toSubAccount) as SubAccount
	});

	return await transfer({
		to: recipient,
		amount: 10_000n,
		memo: TOP_UP_CANISTER_MEMO,
		createdAt: nowInBigIntNanoSeconds()
	});
};

const notifyTopUp = async ({
	agent,
	blockIndex: block_index
}: {
	agent: HttpAgent;
	blockIndex: bigint;
}) => {
	const { notifyTopUp } = CMCCanister.create({
		agent,
		canisterId: CMC_ID
	});

	await notifyTopUp({
		block_index,
		canister_id: CONSOLE_ID
	});
};
