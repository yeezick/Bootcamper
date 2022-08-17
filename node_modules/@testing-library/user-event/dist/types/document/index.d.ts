declare const isPrepared: unique symbol;
declare global {
    interface Node {
        [isPrepared]?: typeof isPrepared;
    }
}
export declare function prepareDocument(document: Document): void;
export { getUIValue, setUIValue, commitValueAfterInput, clearInitialValue, } from './value';
export { getUISelection, setUISelection } from './selection';
export type { UISelectionRange } from './selection';
