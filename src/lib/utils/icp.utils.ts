import { E8S_PER_ICP } from '../constants/app.constants';
import { formatNumber } from './number.utils';

export const formatICP = (icp: number): string =>
	formatNumber(icp, {
		minFraction: 4,
		maxFraction: 8
	});

export const formatE8sICP = (balance: bigint): string =>
	formatICP(Number(balance) / Number(E8S_PER_ICP));

export const formatE8sCredits = (balance: bigint): string =>
	formatNumber(Number(balance) / Number(E8S_PER_ICP), {
		minFraction: 2,
		maxFraction: 2
	});
