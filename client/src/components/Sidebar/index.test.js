import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from './index';

afterEach(cleanup);

describe('Sidebar component renders', () => {

   it('renders', () => {
      render(<Sidebar />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<Sidebar />);
      expect(asFragment()).toMatchSnapshot();
   });
});