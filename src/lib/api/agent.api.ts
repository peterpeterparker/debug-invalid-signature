import { createAgent as createAgentUtils } from '@dfinity/utils';
import { CONTAINER, DEV } from '$lib/constants/app.constants';
import type { Identity, HttpAgent } from '@dfinity/agent';

export const createAgent = ({ identity }: { identity: Identity }): Promise<HttpAgent> => {
	return createAgentUtils({
		identity,
		...(DEV && { host: CONTAINER, fetchRootKey: true })
	});
};
