import React, { useCallback, useState } from 'react';
import { useStyles } from '../../hooks/useTheme';
import { css, cx } from '@emotion/css';
import { IntInput } from '../components/input/NumberInput';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { generateAppPath } from '../../Routes';
import Result, { Ok, ResultType } from '../../utils/Result';
import { Theme } from '../../models/ThemeModel';

/**
 * Home
 * React Functional Component
 *
 */
export const Home: React.FC = () => {
    const styles = useStyles(makeStyles);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [bombs, setBombs] = useState<ResultType<number, string>>(Ok(10));
    const [width, setWidth] = useState<ResultType<number, string>>(Ok(10));
    const [height, setHeight] = useState<ResultType<number, string>>(Ok(10));

    const play = useCallback(
        (bombs: ResultType<number, string>, width: ResultType<number, string>, height: ResultType<number, string>) => {
            const result = Result.andThen(
                (bombValue) =>
                    Result.andThen(
                        (widthValue) =>
                            Result.map(
                                (heightValue) => ({ bombs: bombValue.toString(), width: widthValue.toString(), height: heightValue.toString() }),
                                height
                            ),
                        width
                    ),
                bombs
            );
            switch (result.status) {
                case 'Ok': {
                    const path = generateAppPath('/game/:width/:height/:bombs', result.data);
                    navigate(path);
                    break;
                }
                case 'Err':
                    break;
            }
        },
        [navigate]
    );

    return (
        <main className={cx(styles.container)}>
            <label className={styles.label} htmlFor='bombs'>
                {t('bombs')}
            </label>
            <IntInput
                onInputChanged={setBombs}
                initialValue={bombs.status === 'Ok' ? bombs.data : undefined}
                min={1}
                max={width.status === 'Ok' && height.status === 'Ok' ? (width.data * height.data) / 2 : undefined}
                inputProps={{ id: 'bombs', className: bombs.status === 'Err' ? styles.error : undefined }}
            />
            <label className={styles.label} htmlFor='width'>
                {t('width')}
            </label>
            <IntInput
                onInputChanged={setWidth}
                initialValue={width.status === 'Ok' ? width.data : undefined}
                min={2}
                max={100}
                inputProps={{ id: 'width', className: width.status === 'Err' ? styles.error : undefined }}
            />
            <label className={styles.label} htmlFor='height'>
                {t('height')}
            </label>
            <IntInput
                onInputChanged={setHeight}
                initialValue={height.status === 'Ok' ? height.data : undefined}
                min={2}
                max={100}
                inputProps={{ id: 'height', className: height.status === 'Err' ? styles.error : undefined }}
            />
            <button className={styles.button} onClick={() => play(bombs, width, height)}>
                {t('play')}
            </button>
        </main>
    );
};

const makeStyles = (theme: Theme) => ({
    container: css`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    error: css`
        border-color: red;
    `,
    label: css`
        margin: ${theme.spacing.XS}px;
    `,
    button: css`
        margin: ${theme.spacing.M}px;
        width: 10%;
        height: ${theme.spacing.M}px;
    `,
});
