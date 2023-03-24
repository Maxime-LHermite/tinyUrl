import React, { useMemo } from 'react';
import { generatePath, useRoutes } from 'react-router';
import { useParams, useSearchParams } from 'react-router-dom';
import { Home } from './ui/pages/Home';
import { Game } from './ui/pages/Game';
import { DecoderFunction, field, number, record } from 'typescript-json-decoder';
import { jsonDecode } from './utils/JsonDecoder';
import { concatenatePath, getFragment, PathParams } from './utils/RoutesUtils';
import { NotFound } from './ui/pages/NotFound';
import { History } from './ui/components/CustomBrowserRouter';
import { useAppDispatch } from './redux/ReduxTypes';

export type Paths = {
    '/home': undefined;
    '/game/:width/:height/:bombs': { width: number; height: number; bombs: number };
    '404': undefined;
    '': undefined;
};

type PathsWithParams = {
    [Path in keyof Paths]: PathParams<Path>;
};

type AppRoutesType = {
    [Path in keyof Paths]: Paths[Path] extends undefined
        ? { render: React.ReactNode }
        : {
              decoder: DecoderFunction<Paths[Path]>;
              render: (params: Paths[Path]) => React.ReactNode;
          };
};

const appRoutesRenderers: AppRoutesType = {
    '/home': { render: <Home /> },
    '/game/:width/:height/:bombs': {
        render: (params) => <Game {...params} />,
        decoder: (data) =>
            record({
                width: field('width', number),
                height: field('height', number),
                bombs: field('bombs', number),
            })(data),
    },
    '404': { render: <NotFound /> },
    '': { render: <Home /> },
};

type AppRouteRendererProps = { renderer: typeof appRoutesRenderers[keyof typeof appRoutesRenderers] };

const AppRouteRenderer: React.FC<AppRouteRendererProps> = ({ renderer }) => {
    if ('decoder' in renderer) {
        const params = useParams();
        const searchParams = Object.fromEntries(useSearchParams()[0].entries());
        const fragment = getFragment(History.location.hash);
        const decodedValue = jsonDecode(renderer.decoder, {
            ...fragment,
            ...searchParams,
            ...params,
        });

        switch (decodedValue.status) {
            case 'Ok':
                return <>{renderer.render(decodedValue.data)}</>;
            case 'Err':
                return <NotFound />;
        }
    } else {
        return <>{renderer.render}</>;
    }
};

export const AppRoutes: React.FC = () => {
    useAppDispatch();
    useParams();
    const routesObject = useMemo(
        () =>
            Object.entries(appRoutesRenderers).map(([key, renderer]) => ({
                path: key,
                element: <AppRouteRenderer renderer={renderer} />,
            })),
        []
    );
    return useRoutes(routesObject);
};

export const generateAppPath = <K extends keyof Paths>(
    path: K,
    params: PathsWithParams[K],
    query?: Partial<Paths[K]>,
    fragment?: Partial<Paths[K]>
): string => {
    return concatenatePath(generatePath(path, params), query, fragment);
};
