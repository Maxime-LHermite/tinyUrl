import React from 'react';
import { useStyles } from '../../hooks/useTheme';
import { css } from '@emotion/css';
import { TinyUrl } from '../components/tinyUrl/TinyUrl';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../redux/ReduxTypes';
import { AuthenticationSlice } from '../../redux/AuthenticationSlice';
import { Theme } from '../../models/ThemeModel';
import { localesNames } from '../../I18n';

/**
 * Home
 * React Functional Component
 *
 */
export const Home: React.FC = () => {
    const styles = useStyles(makeStyles);
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();

    return (
        <main className={styles.container}>
            <TinyUrl style={styles.content} />
            <div className={styles.footer}>
                <button disabled={i18n.language === 'fr'} onClick={() => i18n.changeLanguage('fr')}>
                    {localesNames.fr}
                </button>
                <button disabled={i18n.language === 'en'} onClick={() => i18n.changeLanguage('en')} className={styles.footerItem}>
                    {localesNames.en}
                </button>
                <button onClick={() => dispatch(AuthenticationSlice.actions.logout())}>{t('auth.logout')}</button>
            </div>
        </main>
    );
};

const makeStyles = (theme: Theme) => ({
    container: css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    `,
    content: css`
        flex-grow: 2;
    `,
    footer: css`
        height: 10%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    `,
    footerItem: css`
        margin-right: ${theme.spacing.M}px;
    `,
});
