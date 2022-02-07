import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for storage
 */
export class StorageService {
  private hasStorage: boolean;

  constructor() {
    this.hasStorage = this.isLocalStorageAvailable();
  }

  /**
   * Saves values in the storage.
   *
   * @param key   The value's key.
   * @param value String value to be stored.
   */
  setItem(key: string, value: string): void {
    if (this.hasStorage) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Retrieves a value from the storage.
   *
   * @param key   The value's key.
   */
  getItem(key: string): string|null {
    if (this.hasStorage) {
      return localStorage.getItem(key);
    }

    return null;
  }

  /**
   * Deletes a value from the storage.
   *
   * @param key   The value's key.
   */
  removeItem(key: string): void {
    if (this.hasStorage) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Empties the storage.
   *
   */
  clear(): void {
    if (this.hasStorage) {
      localStorage.clear();
    }
  }

  /**
   * Simple localStorage availability test
   *
   * @private
   */
  isLocalStorageAvailable(): boolean {
    try {
      localStorage.setItem('is_available', 'true');
      localStorage.removeItem('is_available');
      return true;
    } catch (e) {
      return false;
    }
  }
}