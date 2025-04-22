import { Buffer } from 'buffer';

(window as any).global = window;
(window as any).Buffer = Buffer;

// You might also need process if other Node.js features are used
// import * as process from 'process';
// (window as any).process = process;