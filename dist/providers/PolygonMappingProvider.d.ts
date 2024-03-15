import { MappingProvider } from './MappingProvider';
import { PolygonMappedTokenData } from '../constants/types';
/**
 * The Polygon team manually maintains the mapping via user submissions at
 * https://mapper.polygon.technology.
 *
 * This provider provides the l1->l2(Polygon) token mappings.
 */
export declare class PolygonMappingProvider implements MappingProvider {
    provide(): Promise<PolygonMappedTokenData>;
}
