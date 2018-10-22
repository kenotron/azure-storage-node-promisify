# azure-storage-node-promisify

`azure-storage` is a wonderful and _cheap_ way to store objects and blobs. Be sure to check it out here: [https://azure.microsoft.com/en-us/services/storage/]. However, the current version of the [Azure Storage API for Node](https://github.com/Azure/azure-storage-node). The entire API uses callbacks. Node.js APIs suffered the same issue, leading ot callback hell. The solution is to promisify the callback functions so that it is compatible with await / async syntax. Since Node.js 8.x, a new `promisify` function has been introduced for the `util` module.

## Installation

`npm install azure-storage-node-promisify`

## Usage

This library is Typescript friendly. It tries to preserve the parameter as much as possible.

```ts
import azure from 'azure-storage';
import { promisifyTableService } from 'azure-storage-node-promisify';

const connectionString = '...'; // you can use any of the Azure Storage Node SDK's auth methods
const tableService = promisifyTableService(azure.createTableService(connectionString));

(async () => {
  await tableService.createTableIfNotExistsAsync('testTable');

  // Welcome to the future of CHEAP storage and async / await syntax!
})();
```
