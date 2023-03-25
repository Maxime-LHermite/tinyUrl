import React from 'react';
import { useStyles } from '../../hooks/useTheme';
import { css } from '@emotion/css';
import { Theme } from '../../models/ThemeModel';

type Orientation = 'vertical' | 'horizontal';
/**
 * Component props
 */
type DividerProps = {
    orientation: Orientation;
};

/**
 * Divider
 * React Functional Component
 *
 */
export const Divider: React.FC<DividerProps> = ({ orientation }) => {
    const styles = useStyles(makeStyles, orientation);

    return (
        <div className={styles.container}>
            <div className={styles.divider}></div>
        </div>
    );
};

const makeStyles = (theme: Theme, orientation: Orientation) => ({
    container: css`
        align-self: stretch;
        margin-left: ${orientation === 'vertical' ? `${theme.spacing.XS}px` : '0'};
        margin-right: ${orientation === 'vertical' ? `${theme.spacing.XS}px` : '0'};
        margin-top: ${orientation === 'vertical' ? '0' : `${theme.spacing.XS}px`};
        margin-bottom: ${orientation === 'vertical' ? '0' : `${theme.spacing.XS}px`};
    `,
    divider: css`
        border-color: ${theme.colors.primary};
        border-width: 0.5px;
        border-style: solid;
        width: ${orientation === 'vertical' ? '1px' : '100%'};
        height: ${orientation === 'vertical' ? '100%' : '1px'};
    `,
});
