import { promisify } from 'util';
import azure from 'azure-storage';

const overrideMethods: (keyof azure.TableService)[] = [
  'insertEntity',
  'retrieveEntity',
  'insertOrReplaceEntity',
  'replaceEntity',
  'mergeEntity',
  'insertOrMergeEntity',
  'deleteEntity',
  'executeBatch',
  'createTableIfNotExists',
  'createTable'
];

export interface PromisifiedTableService extends azure.TableService {
  createTableIfNotExistsAsync(table: string, options: azure.common.RequestOptions): Promise<azure.TableService.TableResult>;
  createTableIfNotExistsAsync(table: string): Promise<azure.TableService.TableResult>;
  createTableAsync(table: string, options: azure.common.RequestOptions): Promise<azure.TableService.TableResult>;
  createTableAsync(table: string): Promise<azure.TableService.TableResult>;
  insertEntityAsync<T>(table: string, entityDescriptor: T, options: azure.TableService.InsertEntityRequestOptions): Promise<T | azure.TableService.EntityMetadata>;
  insertEntityAsync<T>(table: string, entityDescriptor: T, options: azure.common.RequestOptions): Promise<azure.TableService.EntityMetadata>;
  insertEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.TableService.EntityMetadata>;
  retrieveEntityAsync<T>(table: string, partitionKey: string, rowKey: string, options: azure.TableService.TableEntityRequestOptions): Promise<T>;
  retrieveEntityAsync<T>(table: string, partitionKey: string, rowKey: string): Promise<T>;
  insertOrReplaceEntityAsync<T>(table: string, entityDescriptor: T, options: azure.common.RequestOptions): Promise<azure.TableService.EntityMetadata>;
  insertOrReplaceEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.TableService.EntityMetadata>;
  replaceEntityAsync<T>(table: string, entityDescriptor: T, options: azure.common.RequestOptions): Promise<azure.TableService.EntityMetadata>;
  replaceEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.TableService.EntityMetadata>;
  mergeEntityAsync<T>(table: string, entityDescriptor: T, options: azure.common.RequestOptions): Promise<azure.TableService.EntityMetadata>;
  mergeEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.TableService.EntityMetadata>;
  insertOrMergeEntityAsync<T>(table: string, entityDescriptor: T, options: azure.common.RequestOptions): Promise<azure.TableService.EntityMetadata>;
  insertOrMergeEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.TableService.EntityMetadata>;
  deleteEntityAsync<T>(table: string, entityDescriptor: T, options: azure.common.RequestOptions): Promise<azure.ServiceResponse>;
  deleteEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.ServiceResponse>;
  executeBatchAsync(table: string, batch: azure.TableBatch, options: azure.TableService.TableEntityRequestOptions): Promise<azure.TableService.BatchResult[]>;
  executeBatchAsync(table: string, batch: azure.TableBatch): Promise<azure.TableService.BatchResult[]>;
}

export function promisifyTableService(originalTableService: azure.TableService) {
  const tableService = originalTableService as PromisifiedTableService;

  overrideMethods.forEach(method => {
    (<any>tableService)[method + 'Async'] = promisify(originalTableService[method] as Function).bind(originalTableService);
  });

  return tableService;
}
