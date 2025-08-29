export interface DatabaseConfig {
  name: string;
  version: number;
  stores: {
    name: string;
    keyPath: string;
    indexes?: Array<{
      name: string;
      keyPath: string;
      options?: IDBIndexParameters;
    }>;
  }[];
}

export class LocalDatabase {
  private static instance: LocalDatabase;
  private db: IDBDatabase | null = null;
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  static getInstance(config?: DatabaseConfig): LocalDatabase {
    if (!LocalDatabase.instance && config) {
      LocalDatabase.instance = new LocalDatabase(config);
    }
    return LocalDatabase.instance;
  }

  async init(): Promise<boolean> {
    return new Promise(resolve => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, falling back to localStorage');
        resolve(false);
        return;
      }

      const request = indexedDB.open(this.config.name, this.config.version);

      request.onerror = () => {
        console.error('Failed to open IndexedDB');
        resolve(false);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(true);
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        this.config.stores.forEach(store => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
            });

            // Create indexes
            store.indexes?.forEach(index => {
              objectStore.createIndex(index.name, index.keyPath, index.options);
            });
          }
        });
      };
    });
  }

  async set(storeName: string, key: string, value: unknown): Promise<boolean> {
    if (!this.db) {
      // Fallback to localStorage
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
      }
    }

    return new Promise(resolve => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put({
        [store.keyPath as string]: key,
        data: value,
      });

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  }

  async get(storeName: string, key: string): Promise<unknown> {
    if (!this.db) {
      // Fallback to localStorage
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    }

    return new Promise(resolve => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.data : null);
      };
      request.onerror = () => resolve(null);
    });
  }

  async remove(storeName: string, key: string): Promise<boolean> {
    if (!this.db) {
      // Fallback to localStorage
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
      }
    }

    return new Promise(resolve => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  }

  async clear(storeName: string): Promise<boolean> {
    if (!this.db) {
      // Fallback to localStorage
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
      }
    }

    return new Promise(resolve => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  }
}

// Background image specific database configuration
export const backgroundImageDBConfig: DatabaseConfig = {
  name: 'FinanceAppDB',
  version: 1,
  stores: [
    {
      name: 'backgroundImages',
      keyPath: 'id',
      indexes: [
        { name: 'timestamp', keyPath: 'timestamp' },
        { name: 'fileName', keyPath: 'fileName' },
      ],
    },
  ],
};

// Export a pre-configured database instance for background images
export const backgroundImageDB = LocalDatabase.getInstance(
  backgroundImageDBConfig
);
