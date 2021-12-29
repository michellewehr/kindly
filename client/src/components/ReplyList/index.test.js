import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Reply from './index';

afterEach(cleanup);

describe('Reply component renders', () => {

   it('renders', () => {
      render(<Reply />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<Reply />);
      expect(asFragment()).toMatchSnapshot();
   });
});