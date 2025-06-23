// TypeScript type definitions for rison.js
// Project: https://github.com/Nanonid/rison (original upstream)
// Definitions by: <Your Name Here>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*~ NOTE:
 *~ This is an ambient module declaration file for the UMD library `rison`.
 *~ It provides typings both for consuming the package via CommonJS/ESM imports
 *~ and for usage from the global `rison` variable in browser contexts.
 *~ The library is dynamic and loosely typed; these definitions therefore use
 *~ `unknown` in many places, while still capturing the main API surface.
 */

/* eslint-disable @typescript-eslint/consistent-type-definitions */

// ---------------------------------------------------------------------------
// Global variable declaration (merges with the namespace below)
// ---------------------------------------------------------------------------

// (Removed duplicate var declaration to prevent identifier conflicts)

// ---------------------------------------------------------------------------
// Public API helpers and types
// ---------------------------------------------------------------------------

type AnyObject = Record<string, unknown>;

// ---------------------------------------------------------------------------
// Parser class (exposed via rison.parser)
// ---------------------------------------------------------------------------

declare class parser {
  constructor(errorHandler?: (message: string, index?: number) => void);

  // Static fields -----------------------------------------------------------
  static WHITESPACE: string;

  // Instance fields ---------------------------------------------------------
  string: string;
  index: number;
  message: string | null;
  errorHandler: (message: string, index?: number) => void;

  // Instance methods --------------------------------------------------------
  parse(text: string): unknown;
  error(message: string): unknown;
  setOptions(options: { errorHandler?: (message: string, index?: number) => void }): void;

  // Internal helpers (exposed for completeness)
  readValue(): unknown;
  next(): string | undefined;
}

// ---------------------------------------------------------------------------
// Aggregate type representing the full exported object
// ---------------------------------------------------------------------------

type RisonStatic = {
  // Encoding helpers
  encode(value: unknown): string;
  encode_object(value: AnyObject): string;
  encode_array(value: unknown[]): string;
  encode_uri(value: unknown): string;

  // Decoding helpers
  decode(text: string): unknown;
  decode_object(text: string): AnyObject;
  decode_array(text: string): unknown[];

  // Utility helpers & metadata
  quote(text: string): string;
  uri_ok: Record<string, true>;
  not_idchar: string;
  not_idstart: string;
  id_ok: RegExp;
  next_id: RegExp;

  // Parser constructor
  parser: typeof parser;
};

// ---------------------------------------------------------------------------
// UMD export declarations
// ---------------------------------------------------------------------------

/** Object exported by the module and exposed as global `rison` when loaded via
 *  a script tag. */
declare const rison: RisonStatic;

export = rison;
export as namespace rison; 