import { TokenList } from '@uniswap/token-lists';
/**
 * Verifies that for each token with extensions.bridgeInfo defined, for every
 * chainId there exists a token with that chainId at the root-level of the
 * token list.
 *
 * @returns input TokenList if valid, throws otherwise
 */
export declare function verifyExtensions(tokenList: TokenList): TokenList;
