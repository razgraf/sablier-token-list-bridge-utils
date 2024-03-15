import { MappingProvider } from './MappingProvider';
import { MappedTokenData } from '../constants/types';
export declare class AvalancheMappingProvider implements MappingProvider {
    provide(): Promise<MappedTokenData>;
}
