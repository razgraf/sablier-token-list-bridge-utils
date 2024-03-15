import { TokenList } from '@uniswap/token-lists';
import { ChainId } from './constants/chainId';
import { TokenListOrFetchableTokenList } from './utils';
/**
 * Adds bridgeInfo to the given token list for Optimism, Polygon and Arbitrum.
 * @param l1TokenListOrPathOrUrl
 * @returns TokenList with l2 bridgeInfo filled
 */
export declare function chainify(l1TokenListOrPathOrUrl: TokenListOrFetchableTokenList): Promise<TokenList>;
/**
 * Given a network and a TokenList, returns the TokenList with `extensions` filled.
 * @param l2ChainIds layer 2 chainIds to operate on
 * @param l1TokenListOrPathOrUrl either an L1 TokenList object or a path/url to a TokenList
 * @returns L1 TokenList with `extensions` filled for the given network
 */
export declare function chainifyTokenList(l2ChainIds: Array<ChainId>, l1TokenListOrPathOrUrl: TokenListOrFetchableTokenList): Promise<TokenList>;
/** Merges two token lists, resolving conflicts to primary list. */
export declare function mergeTokenLists(primary: TokenList, secondary: TokenList): TokenList;
