// Storage utility functions for better localStorage management

export interface StorageData {
  [key: string]: unknown;
}

export class StorageManager {
  private static instance: StorageManager;
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  set(key: string, value: unknown): boolean {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error setting item in localStorage: ${key}`, error);
      return false;
    }
  }

  get<T = unknown>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${key}`, error);
      // Remove corrupted data
      this.remove(key);
      return null;
    }
  }

  remove(key: string): boolean {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from localStorage: ${key}`, error);
      return false;
    }
  }

  clear(): boolean {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage', error);
      return false;
    }
  }

  has(key: string): boolean {
    try {
      return this.storage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking item in localStorage: ${key}`, error);
      return false;
    }
  }

  getSize(): number {
    try {
      let size = 0;
      for (const key in this.storage) {
        if (Object.prototype.hasOwnProperty.call(this.storage, key)) {
          size += this.storage[key].length;
        }
      }
      return size;
    } catch (error) {
      console.error('Error calculating localStorage size', error);
      return 0;
    }
  }

  getAvailableSpace(): number {
    try {
      const testKey = '__storage_test__';

      // Try to store a large value to see how much space is available
      let availableSpace = 0;
      let testSize = 1024 * 1024; // Start with 1MB

      while (testSize > 0) {
        try {
          this.storage.setItem(testKey, 'x'.repeat(testSize));
          availableSpace = testSize;
          break;
        } catch {
          testSize = Math.floor(testSize / 2);
        }
      }

      // Clean up
      this.storage.removeItem(testKey);
      return availableSpace;
    } catch (error) {
      console.error('Error calculating available localStorage space', error);
      return 0;
    }
  }
}

// Background image specific storage functions
export const BackgroundImageStorage = {
  KEY: 'appBackgroundImage',

  save(imageData: {
    url: string;
    timestamp: number;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
  }): boolean {
    const storage = StorageManager.getInstance();
    return storage.set(BackgroundImageStorage.KEY, imageData);
  },

  load(): {
    url: string;
    timestamp: number;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
  } | null {
    const storage = StorageManager.getInstance();
    return storage.get(BackgroundImageStorage.KEY);
  },

  remove(): boolean {
    const storage = StorageManager.getInstance();
    return storage.remove(BackgroundImageStorage.KEY);
  },

  exists(): boolean {
    const storage = StorageManager.getInstance();
    return storage.has(BackgroundImageStorage.KEY);
  },
};

// Export the storage manager instance
export const storageManager = StorageManager.getInstance();
