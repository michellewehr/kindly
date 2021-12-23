import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FriendList from './index';

afterEach(cleanup);

describe('FriendList component renders', () => {

   it('renders', () => {
      render(<FriendList />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<FriendList />);
      expect(asFragment()).toMatchSnapshot();
   });
});