import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './index';

afterEach(cleanup);

describe('Header component renders', () => {

   it('renders', () => {
      render(<Header />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<Header />);
      expect(asFragment()).toMatchSnapshot();
   });
});