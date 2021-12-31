import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentList from './index';

afterEach(cleanup);

describe('Comment component renders', () => {

   it('renders', () => {
      render(<CommentList />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<CommentList />);
      expect(asFragment()).toMatchSnapshot();
   });
});