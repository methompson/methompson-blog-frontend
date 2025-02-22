/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} bytes
* @param {any} input
* @returns {Uint8Array}
*/
export function process_image(bytes: Uint8Array, input: any): Uint8Array;
/**
* @param {Uint8Array} bytes
* @param {number} width
* @param {number} height
* @param {any} input
* @returns {Uint8Array}
*/
export function process_rgb_data(bytes: Uint8Array, width: number, height: number, input: any): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly process_image: (a: number, b: number, c: number) => number;
  readonly process_rgb_data: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
