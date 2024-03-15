import { MappingProvider } from './MappingProvider';
import { MappedTokenData } from '../constants/types';
export declare class CeloMappingProvider implements MappingProvider {
    provide(): Promise<MappedTokenData>;
}
