import { MultiCaller } from '@arbitrum/sdk';
export declare const getL2TokenAddressesFromL1: (l1TokenAddresses: string[], multiCaller: MultiCaller, l1GatewayRouterAddress: string) => Promise<(string | undefined)[]>;
