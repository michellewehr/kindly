import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './index';

afterEach(cleanup);

describe('Footer component renders', () => {

   it('renders', () => {
      render(<Footer />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<Footer />);
      expect(asFragment()).toMatchSnapshot();
   });
});