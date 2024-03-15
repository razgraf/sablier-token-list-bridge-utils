import { MappingProvider } from './MappingProvider';
import { GenericMappedTokenData } from '../constants/types';
/**
 * The Base mapping (linked above) is manually maintained by the Coinbase team
 * in this repository: https://github.com/ethereum-optimism/ethereum-optimism.github.io.
 */
export declare class BaseMappingProvider implements MappingProvider {
    provide(): Promise<GenericMappedTokenData>;
}
