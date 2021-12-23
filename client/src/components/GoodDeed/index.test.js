import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GoodDeed from './index';

afterEach(cleanup);

describe('GoodDeed component renders', () => {

   it('renders', () => {
      render(<GoodDeed />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<GoodDeed />);
      expect(asFragment()).toMatchSnapshot();
   });
});