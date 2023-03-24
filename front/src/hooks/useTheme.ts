import { Theme } from '../models/ThemeModel';
import { useAppSelector } from '../redux/ReduxTypes';
import { useMemo } from 'react';

export const useTheme = (): Theme => {
    return useAppSelector((state) => state.theme);
};

type StylesFn<T> = T extends (theme: Theme, ...args: (infer Args)[]) => infer Ret
    ? { args: Args; ret: Ret; fn: (theme: Theme, ...args: Args[]) => Ret }
    : never;

export function useStyles<Fn extends (theme: Theme, ...args: any[]) => unknown>(styles: Fn, ...args: StylesFn<Fn>['args'][]): StylesFn<Fn>['ret'] {
    const theme = useTheme();
    return useMemo(() => styles(theme, ...args), [theme, ...args]);
}
