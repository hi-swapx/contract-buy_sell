# Swapx buy and sell contract

## Deploy

```shell
npx hardhat build

npx hardhat ignition deploy ./ignition/modules/BuySell.ts --network xonetest
```

## Add Support Token

TA: 支持的代币地址
CA: 表示合约地址

```shell
TA=0xc69751291E117420065c10bc4ba155448a5e7338 CA=0xed7c9Aca989650c7Aae93E5A15bD62B0Fc6e2c93 npx hardhat run scripts/addToken.ts --network xonetest
```
