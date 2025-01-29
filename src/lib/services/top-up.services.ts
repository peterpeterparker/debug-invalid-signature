import { nowInBigIntNanoSeconds, principalToSubAccount } from '@dfinity/utils';
import {
	CONSOLE_ID,
	TOP_UP_CANISTER_MEMO,
	CMC_ID,
	TOP_UP_VALUE
} from '$lib/constants/app.constants';
import { AccountIdentifier, LedgerCanister, SubAccount } from '@dfinity/ledger-icp';
import { CMCCanister } from '@dfinity/cmc';
import type { IdentityParams } from '$lib/types/identity';
import { createAgent } from '$lib/api/agent.api';

export const topUp = async (params: IdentityParams) => {
	const blockIndex = await sendIcp(params);

	console.log('Send ICP 👌');

	await notifyTopUp({
		...params,
		blockIndex
	});

	console.log('Notify top-up 👌');
};

const sendIcp = async (params: IdentityParams): Promise<bigint> => {
	const agent = await createAgent(params);

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
		amount: TOP_UP_VALUE,
		memo: TOP_UP_CANISTER_MEMO,
		createdAt: nowInBigIntNanoSeconds()
	});
};

const notifyTopUp = async ({
	identity,
	blockIndex: block_index
}: IdentityParams & {
	blockIndex: bigint;
}) => {
	const agent = await createAgent({ identity });

	const { notifyTopUp } = CMCCanister.create({
		agent,
		canisterId: CMC_ID
	});

	await notifyTopUp({
		block_index,
		canister_id: CONSOLE_ID
	});
};
