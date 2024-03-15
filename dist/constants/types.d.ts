export interface PolygonMappedToken {
    rootToken: string;
    childToken: string;
    isPos?: boolean;
}
export interface MappedToken {
    childToken: string;
    decimals: number;
}
export declare type GenericMappedTokenData = {
    [key: string]: string | undefined;
};
export declare type PolygonMappedTokenData = {
    [key: string]: PolygonMappedToken;
};
export declare type MappedTokenData = {
    [key: string]: MappedToken;
};
