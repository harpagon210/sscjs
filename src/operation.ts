export type ContractName = 'tokens' | 'witnesses' | 'nft' | 'nftmarket' | 'market';
export type ContractAction =
    | 'enableStaking'
    | 'stake'
    | 'unstake'
    | 'cancelUnstake'
    | 'enableDelegation'
    | 'delegate'
    | 'undelegate'
    | 'updatePrecision'
    | 'create'
    | 'issue'
    | 'transfer'
    | 'transferToContract'
    | 'transferOwnership'
    | 'updateUrl'
    | 'updateMetadata'
    | 'updateMetadata';

/**
 * Generic operation.
 */
export interface Operation {
    0: ContractName;
    1: ContractAction;
    2: { [key: string]: any };
}

export interface OperationJson {
    contractName: Operation[0];
    contractAction: Operation[1];
    contractPayload: Operation[2];
}

// Staking

export interface TokensEnableStakingOperation extends Operation {
    0: 'tokens';
    1: 'enableStaking';
    2: {
        symbol: string;
        unstakingCooldown: number;
        numberTransactions: number;
    };
}

export interface TokensStakeOperation extends Operation {
    0: 'tokens';
    1: 'stake';
    2: {
        to: string;
        symbol: string;
        quantity: string;
    };
}

export interface TokensUnstakeOperation extends Operation {
    0: 'tokens';
    1: 'unstake';
    2: {
        symbol: string;
        quantity: string;
    };
}

export interface TokensCancelUnstakeOperation extends Operation {
    0: 'tokens';
    1: 'cancelUnstake';
    2: {
        txID: string;
    };
}

// Delegation

export interface TokensEnableDelegationOperation extends Operation {
    0: 'tokens';
    1: 'enableDelegation';
    2: {
        symbol: string;
        undelegationCooldown: number;
    };
}

export interface TokensDelegateOperation extends Operation {
    0: 'tokens';
    1: 'delegate';
    2: {
        to: string;
        symbol: string;
        quantity: string;
    };
}

export interface TokensUndelegateOperation extends Operation {
    0: 'tokens';
    1: 'undelegate';
    2: {
        to: string;
        symbol: string;
        quantity: string;
    };
}

// Tokens

export interface TokensUpdatePrecisionOperation extends Operation {
    0: 'tokens';
    1: 'updatePrecision';
    2: {
        symbol: string;
        precision: number;
    };
}

// Other

export interface TokensCreateOperation extends Operation {
    0: 'tokens';
    1: 'create';
    2: {
        symbol: string;
        name: string;
        precision: number;
        maxSupply: string;
        url: string;
    };
}

export interface TokensIssueOperation extends Operation {
    0: 'tokens';
    1: 'issue';
    2: {
        symbol: string;
        to: string;
        quantity: string;
    };
}

export interface TokensTransferOperation extends Operation {
    0: 'tokens';
    1: 'transfer';
    2: {
        symbol: string;
        to: string;
        quantity: string;
    };
}

export interface TokensTransferToContractOperation extends Operation {
    0: 'tokens';
    1: 'transferToContract';
    2: {
        symbol: string;
        to: string;
        quantity: string;
    };
}

export interface TokensTransferOwnershipOperation extends Operation {
    0: 'tokens';
    1: 'transferOwnership';
    2: {
        symbol: string;
        to: string;
    };
}

export interface TokensUpdateUrlOperation extends Operation {
    0: 'tokens';
    1: 'updateUrl';
    2: {
        symbol: string;
        url: string;
    };
}

export interface TokensUpdateMetadataOperation extends Operation {
    0: 'tokens';
    1: 'updateMetadata';
    2: {
        symbol: string;
        metadata: JSON;
    };
}
