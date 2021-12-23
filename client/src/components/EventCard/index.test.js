import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventCard from './index';

afterEach(cleanup);

describe('EventCard component renders', () => {

   it('renders', () => {
      render(<EventCard />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<EventCard />);
      expect(asFragment()).toMatchSnapshot();
   });
});