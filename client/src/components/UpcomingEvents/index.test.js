import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpcomingEvents from './index';

afterEach(cleanup);

describe('UpcomingEvents component renders', () => {

   it('renders', () => {
      render(<UpcomingEvents />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<UpcomingEvents />);
      expect(asFragment()).toMatchSnapshot();
   });
});