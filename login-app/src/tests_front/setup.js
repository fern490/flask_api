import { vi } from 'vitest'

global.fetch = vi.fn() 

const storage = {}
global.sessionStorage = {
  setItem: (k, v) => storage[k] = v,
  getItem: (k) => storage[k],
  clear: () => Object.keys(storage).forEach(k => delete storage[k])
}