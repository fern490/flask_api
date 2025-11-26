import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest';

globalThis.fetch = vi.fn() 

const storage = {}
globalThis.sessionStorage = {
  setItem: (k, v) => storage[k] = v,
  getItem: (k) => storage[k],
  clear: () => Object.keys(storage).forEach(k => delete storage[k])
}