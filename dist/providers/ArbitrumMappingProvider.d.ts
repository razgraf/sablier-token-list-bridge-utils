import { MappingProvider } from './MappingProvider';
import { TokenList } from '@uniswap/token-lists';
import { GenericMappedTokenData } from '../constants/types';
/**
 * This provider provides the l1->l2(Arbitrum) address mappings using the arbitrum SDK.
 */
export declare class ArbitrumMappingProvider implements MappingProvider {
    l1TokenList: TokenList;
    constructor(l1TokenList: TokenList);
    provide(): Promise<GenericMappedTokenData>;
}
