import * as types from "@/types";
export declare class RandomStringOfExclude {
    #private;
    constructor(excludes?: string | types.RandomStringRange | types.RandomStringRange[]);
    include(code: number): boolean | undefined;
    toJSON(): object;
    toString(): string;
}
//# sourceMappingURL=RandomStringOfExclude.d.ts.map