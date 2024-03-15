import { ChainId } from '../constants/chainId';
import { TokenList } from '@uniswap/token-lists';
export declare function buildList(l2ChainIds: Array<ChainId>, l1TokenList: TokenList): Promise<TokenList>;
