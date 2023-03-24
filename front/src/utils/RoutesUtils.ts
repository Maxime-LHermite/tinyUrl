import { createSearchParams } from 'react-router-dom';

type _PathParam<Path extends string> =
    // split path into individual path segments
    Path extends `${infer L}/${infer R}`
        ? _PathParam<L> | _PathParam<R>
        : // find params after `:`
        Path extends `${string}:${infer Param}`
        ? Param
        : // otherwise, there aren't any params present
          never;

type PathParam<Path extends string> =
    // check if path is just a wildcard
    Path extends '*'
        ? '*'
        : // look for wildcard at the end of the path
        Path extends `${infer Rest}/*`
        ? '*' | _PathParam<Rest>
        : // look for params in the absence of wildcards
          _PathParam<Path>;

type Params<Path extends string> = {
    [key in PathParam<Path>]: string;
};

export type PathParams<Path extends string> = keyof Params<Path> extends undefined ? undefined : Params<Path>;

export const getFragment = (fragment: string): Record<string, unknown> => {
    try {
        return JSON.parse(fragment.substring(1));
    } catch (e) {
        return {};
    }
};
export const concatenatePath = (path: string, searchParams?: Record<string, unknown>, fragment?: unknown): string => {
    const params = searchParams
        ? createSearchParams(
              Object.entries(searchParams).reduce((acc, [key, value]) => {
                  if (value) {
                      acc.push([key, value.toString()]);
                  }
                  return acc;
              }, [] as [string, string][])
          )
        : undefined;

    const fragmentBase64 = fragment ? atob(JSON.stringify(fragment)) : undefined;

    return `${path}${params ? `?${params}` : ''}${fragment}${fragmentBase64 ? `#${fragmentBase64}` : ''}`;
};
