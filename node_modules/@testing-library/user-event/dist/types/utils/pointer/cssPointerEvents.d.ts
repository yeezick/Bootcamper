import { Config } from '../../setup';
import { ApiLevel } from '..';
export declare function hasPointerEvents(config: Config, element: Element): boolean;
declare function closestPointerEventsDeclaration(element: Element): {
    pointerEvents: string;
    tree: Element[];
} | undefined;
declare const PointerEventsCheck: unique symbol;
declare global {
    interface Element {
        [PointerEventsCheck]?: {
            [k in ApiLevel]?: object;
        } & {
            result: ReturnType<typeof closestPointerEventsDeclaration>;
        };
    }
}
export declare function assertPointerEvents(config: Config, element: Element): void;
export {};
