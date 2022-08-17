declare const UIValue: unique symbol;
declare const InitialValue: unique symbol;
declare const TrackChanges: unique symbol;
declare global {
    interface Window {
        REACT_VERSION?: number;
    }
    interface Element {
        [UIValue]?: string;
        [InitialValue]?: string;
        [TrackChanges]?: {
            previousValue?: string;
            tracked?: string[];
            nextValue?: string;
        };
    }
}
export declare function prepareValueInterceptor(element: HTMLInputElement | HTMLTextAreaElement): void;
export declare function setUIValue(element: HTMLInputElement | HTMLTextAreaElement, value: string): void;
export declare function getUIValue(element: HTMLInputElement | HTMLTextAreaElement): string;
/** Flag the IDL value as clean. This does not change the value.*/
export declare function setUIValueClean(element: HTMLInputElement | HTMLTextAreaElement): void;
export declare function clearInitialValue(element: HTMLInputElement | HTMLTextAreaElement): void;
export declare function getInitialValue(element: HTMLInputElement | HTMLTextAreaElement): string | undefined;
export declare function commitValueAfterInput(element: HTMLInputElement | HTMLTextAreaElement, cursorOffset: number): void;
export {};
