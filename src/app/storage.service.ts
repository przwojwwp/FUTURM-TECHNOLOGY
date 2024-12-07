import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Zapis do localStorage
  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // Odczyt z localStorage
  getItem<T>(key: string): T | null {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  // Usunięcie konkretnego elementu z localStorage
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  // Czyszczenie całego localStorage
  clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  // Sprawdź, czy localStorage jest dostępne
  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && !!window.localStorage;
    } catch (e) {
      return false;
    }
  }
}
