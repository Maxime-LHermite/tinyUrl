import React, { useMemo } from 'react';
import { generatePath, useRoutes } from 'react-router';
import { useParams } from 'react-router-dom';
import { Home } from './ui/pages/Home';
import { DecoderFunction } from 'typescript-json-decoder';
import { concatenatePath, PathParams } from './utils/RoutesUtils';
import { NotFound } from './ui/pages/NotFound';
import { useAppDispatch } from './redux/ReduxTypes';

export type Paths = {
    '/home': undefined;
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
    '404': { render: <NotFound /> },
    '': { render: <Home /> },
};

type AppRouteRendererProps = { renderer: (typeof appRoutesRenderers)[keyof typeof appRoutesRenderers] };

const AppRouteRenderer: React.FC<AppRouteRendererProps> = ({ renderer }) => {
    return <>{renderer.render}</>;
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
