# Splinterlands Hive Engine

Library to interact with [Hive Engine Smart Contracts Platform](https://github.com/hive-engine/steemsmartcontracts). Originally developed by [harpagon210](https://github.com/harpagon210).

## Installation

```
npm i splinterlands-hive-engine
```

## Setup

```
import { Client } from 'splinterlands-hive-engine';

const client = new Client('https://api.hive-engine.com/rpc');

const balance = await client.tokens.getBalancesByAccount('aggroed', ['SWAP.HIVE', 'BEE']);
```
