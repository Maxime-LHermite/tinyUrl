import React, { useCallback, useRef, useState } from 'react';
import { useStyles } from '../../hooks/useTheme';
import { css } from '@emotion/css';
import { useAppDispatch } from '../../redux/ReduxTypes';
import { AuthenticationSlice } from '../../redux/AuthenticationSlice';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../models/ThemeModel';

/**
 * Component props
 */
type LoginPageProps = {
    // Empty
};

/**
 * LoginPage
 * React Functional Component
 *
 */
export const LoginPage: React.FC<LoginPageProps> = () => {
    const [register, setRegister] = useState(false);

    switch (register) {
        case true:
            return <Register setRegister={setRegister} />;
        case false:
            return <Login setRegister={setRegister} />;
    }
};

const Login: React.FC<{ setRegister: React.Dispatch<boolean> }> = ({ setRegister }) => {
    const styles = useStyles(makeStyles);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const login = useCallback(() => {
        if (usernameRef.current && passwordRef.current) {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            if (username && password) {
                dispatch(AuthenticationSlice.actions.login({ username, password }));
            }
        }
    }, [usernameRef, passwordRef]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <label htmlFor={'username'}>{t('auth.username')}</label>
                <input ref={usernameRef} type={'text'} name={'username'} className={styles.item} />
                <label htmlFor={'password'}>{t('auth.password')}</label>
                <input ref={passwordRef} type={'password'} name={'password'} className={styles.item} />
                <button onClick={login} className={styles.item}>
                    {t('auth.login')}
                </button>
                <div onClick={() => setRegister(true)} className={styles.otherAction}>
                    {t('auth.register')}
                </div>
            </div>
        </div>
    );
};

const Register: React.FC<{ setRegister: React.Dispatch<boolean> }> = ({ setRegister }) => {
    const styles = useStyles(makeStyles);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfRef = useRef<HTMLInputElement>(null);

    const login = useCallback(() => {
        if (usernameRef.current && passwordRef.current && passwordConfRef.current) {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            const passwordConf = passwordConfRef.current.value;
            if (username && password && passwordConf && passwordConf == password) {
                dispatch(AuthenticationSlice.actions.register({ username, password }));
            }
        }
    }, [usernameRef, passwordRef]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <label htmlFor={'username'}>{t('auth.username')}</label>
                <input ref={usernameRef} type={'text'} name={'username'} className={styles.item} />
                <label htmlFor={'password'}>{t('auth.password')}</label>
                <input ref={passwordRef} type={'password'} name={'password'} className={styles.item} />
                <label htmlFor={'passwordConf'}>{t('auth.passwordConfirm')}</label>
                <input ref={passwordConfRef} type={'password'} name={'passwordConf'} className={styles.item} />
                <button onClick={login} className={styles.item}>
                    {t('auth.register')}
                </button>
                <div onClick={() => setRegister(false)} className={styles.otherAction}>
                    {t('auth.login')}
                </div>
            </div>
        </div>
    );
};

const makeStyles = (theme: Theme) => ({
    container: css`
        width: 100%;
        height: 100%;
    `,
    content: css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    `,
    item: css`
        margin-bottom: ${theme.spacing.XS}px;
    `,
    otherAction: css`
        cursor: pointer;
        color: cornflowerblue;
        text-decoration: cornflowerblue underline;
    `,
});
