import * as React from 'react';
import { create } from 'react-test-renderer';
import * as Translation from '../src/ui/components/Translation';
import * as Authentication from '../src/ui/components/Authentication';
import * as CustomBrowserRouter from '../src/ui/components/CustomBrowserRouter';
import * as AppRoutes from '../src/Routes';
import { App } from '../src/App';

jest.mock('react-redux', () => ({ Provider: jest.fn() }));
jest.mock('react-dom/client', () => ({ createRoot: () => ({ render: jest.fn() }) }));
jest.mock('@emotion/css', () => ({ injectGlobal: jest.fn() }));
jest.mock('../src/Store', () => ({}));
jest.mock('../src/Logger', () => ({ Logger: { warnValueDebug: jest.fn() } }));
jest.mock('../src/redux/ReduxTypes', () => ({ useAppDispatch: () => ({ dispatch: jest.fn() }) }));
jest.mock('../src/hooks/useResize', () => ({ useWindowDimensionsChange: jest.fn() }));
jest.mock('../src/ui/components/Translation', () => ({ Translation: jest.fn() }));
jest.mock('../src/ui/components/Authentication', () => ({ Authentication: jest.fn() }));
jest.mock('../src/assets/fonts/Fonts', () => ({ Fonts: { Roboto: { Regular: 'roboto-regular' } } }));
jest.mock('../src/Routes', () => ({ AppRoutes: jest.fn() }));
jest.mock('../src/ui/components/CustomBrowserRouter', () => ({ CustomBrowserRouter: jest.fn() }));

describe('App', () => {
    it('render', () => {
        jest.spyOn(Translation, 'Translation').mockImplementation(({ children }) => <div className='Translation'>{children}</div>);
        jest.spyOn(Authentication, 'Authentication').mockImplementation(({ children }) => <div className='Authentication'>{children}</div>);
        jest.spyOn(CustomBrowserRouter, 'CustomBrowserRouter').mockImplementation(({ children }) => (
            <div className='CustomBrowserRouter'>{children}</div>
        ));
        jest.spyOn(AppRoutes, 'AppRoutes').mockImplementation(() => <div className='AppRoutes'>Router content</div>);

        const tree = create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
