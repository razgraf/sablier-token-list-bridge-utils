import { MappingProvider } from './MappingProvider';
import { MappedTokenData } from '../constants/types';
export declare class BnbMappingProvider implements MappingProvider {
    provide(): Promise<MappedTokenData>;
}
