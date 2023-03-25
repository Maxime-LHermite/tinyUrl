import React from 'react';
import { useStyles } from '../../../hooks/useTheme';
import { css, cx } from '@emotion/css';
import { ManageTinyUrls } from './ManageTinyUrls';
import { CreateTinyUrl } from './CreateTinyUrl';

/**
 * Component props
 */
type TinyUrlProps = {
    style?: string;
};

/**
 * TinyUrl
 * React Functional Component
 *
 */
export const TinyUrl: React.FC<TinyUrlProps> = ({ style }) => {
    const styles = useStyles(makeStyles);

    return (
        <div className={cx(styles.container, style)}>
            <CreateTinyUrl style={styles.create} />
            <ManageTinyUrls />
        </div>
    );
};

const makeStyles = () => ({
    container: css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `,
    create: css`
        margin-bottom: 10%;
    `,
});
