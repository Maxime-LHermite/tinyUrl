import React, { useCallback, useRef } from 'react';
import { useStyles } from '../../../hooks/useTheme';
import { css, cx } from '@emotion/css';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../redux/ReduxTypes';
import { TinyUrlSlice } from '../../../redux/TinyUrlSlice';
import { Theme } from '../../../models/ThemeModel';

/**
 * Component props
 */
type CreateTinyUrlProps = {
    style?: string;
};

/**
 * CreateTinyUrl
 * React Functional Component
 *
 */
export const CreateTinyUrl: React.FC<CreateTinyUrlProps> = ({ style }) => {
    const styles = useStyles(makeStyles);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const urlRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const createUrl = useCallback(() => {
        if (urlRef.current) {
            const url = urlRef.current.value;
            const urlName = nameRef.current && nameRef.current.value ? nameRef.current.value : undefined;
            if (url) {
                dispatch(TinyUrlSlice.actions.create({ url, urlName }));
            }
        }
    }, [urlRef, nameRef]);

    return (
        <div className={cx(styles.container, style)}>
            <input ref={urlRef} className={styles.inputURL} type={'text'} name={'url'} placeholder={t('tinyUrl.url')} />
            <input ref={nameRef} className={styles.inputName} type={'text'} name={'name'} placeholder={t('tinyUrl.urlName')} />
            <button onClick={createUrl} className={styles.createButton}>
                {t('tinyUrl.create')}
            </button>
        </div>
    );
};

const makeStyles = (theme: Theme) => ({
    container: css`
        width: 30%;
        display: flex;
        flex-direction: column;
    `,
    inputURL: css`
        padding-left: ${theme.spacing.XXS}px;
        padding-right: ${theme.spacing.XXS}px;
        padding-bottom: ${theme.spacing.XS}px;
        padding-top: ${theme.spacing.XS}px;
        margin-bottom: ${theme.spacing.XS}px;
    `,
    inputName: css`
        padding: ${theme.spacing.XXS}px;
        margin-bottom: ${theme.spacing.XS}px;
    `,
    createButton: css`
        padding: ${theme.spacing.XXS}px;
        background-color: ${theme.colors.primary};
        border-radius: ${theme.spacing.XXS}px;
        color: white;
        border: none;
    `,
});
