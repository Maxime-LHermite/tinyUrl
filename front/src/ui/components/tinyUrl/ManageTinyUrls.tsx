import React, { useEffect } from 'react';
import { useStyles } from '../../../hooks/useTheme';
import { css, cx } from '@emotion/css';
import { useAppDispatch, useAppSelector } from '../../../redux/ReduxTypes';
import { useTranslation } from 'react-i18next';
import { TinyUrlSlice } from '../../../redux/TinyUrlSlice';
import { Divider } from '../Divider';
import { Theme } from '../../../models/ThemeModel';
import * as url from 'url';

/**
 * Component props
 */
type ManageTinyUrlsProps = {
    style?: string;
};

/**
 * ManageTinyUrls
 * React Functional Component
 *
 */
export const ManageTinyUrls: React.FC<ManageTinyUrlsProps> = ({ style }) => {
    const styles = useStyles(makeStyles);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const tinyUrls = useAppSelector((state) => state.tinyUrl);

    useEffect(() => {
        dispatch(TinyUrlSlice.actions.fetch());
    }, [dispatch]);

    switch (tinyUrls.type) {
        case 'NotAsked':
        case 'Loading':
            return <div className={cx(styles.container, style)}>{t('tinyUrl.loading')}</div>;
        case 'Failure':
            return <div className={cx(styles.container, style)}>{t('tinyUrl.error')}</div>;
        case 'Success':
            return (
                <div className={cx(styles.container, style)}>
                    {tinyUrls.data.map((tinyUrl) => (
                        <div key={tinyUrl.id} className={styles.item}>
                            <a className={styles.url} href={tinyUrl.url} target='_blank' rel='noopener noreferrer'>
                                {tinyUrl.url}
                            </a>
                            <Divider orientation={'vertical'} />
                            <a className={styles.url} href={tinyUrl.tinyUrl} target='_blank' rel='noopener noreferrer'>
                                {tinyUrl.tinyUrl}
                            </a>
                            <Divider orientation={'vertical'} />
                            <button className={styles.actionButton} onClick={() => navigator.clipboard.writeText(tinyUrl.tinyUrl)}>
                                {t('tinyUrl.copy')}
                            </button>
                            <Divider orientation={'vertical'} />
                            <button className={styles.actionButton} onClick={() => dispatch(TinyUrlSlice.actions.delete(tinyUrl.id))}>
                                {t('tinyUrl.delete')}
                            </button>
                        </div>
                    ))}
                </div>
            );
    }
};

const makeStyles = (theme: Theme) => ({
    container: css``,
    item: css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: ${theme.spacing.XS}px;
        border: ${theme.colors.primary} 2px solid;
        border-radius: ${theme.spacing.XXS}px;
    `,
    url: css`
        padding: ${theme.spacing.S}px;
    `,
    actionButton: css`
        padding: ${theme.spacing.S}px;
        border: 0;
        cursor: pointer;
        background-color: unset;
    `,
});
