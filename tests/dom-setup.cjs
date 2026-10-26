const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' })
for (const key of ['window','document','HTMLElement','Element','HTMLInputElement','Event','MouseEvent','localStorage','sessionStorage']) globalThis[key] = dom.window[key]
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true })
globalThis.IS_REACT_ACT_ENVIRONMENT = true
window.matchMedia = () => ({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}})
globalThis.IntersectionObserver = window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
