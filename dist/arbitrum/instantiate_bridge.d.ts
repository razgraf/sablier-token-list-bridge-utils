import './set_rpc.ts';
import { providers } from 'ethers';
export declare const getNetworkConfig: () => Promise<{
    l1: {
        network: import("@arbitrum/sdk").L1Network;
        provider: providers.JsonRpcProvider;
        multiCaller: import("@arbitrum/sdk").MultiCaller;
    };
    l2: {
        network: import("@arbitrum/sdk").L2Network;
        provider: providers.JsonRpcProvider;
        multiCaller: import("@arbitrum/sdk").MultiCaller;
    };
}>;
