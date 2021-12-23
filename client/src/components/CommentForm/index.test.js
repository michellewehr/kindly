import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentForm from './index';

afterEach(cleanup);

describe('CommentForm component renders', () => {

   it('renders', () => {
      render(<CommentForm />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<CommentForm />);
      expect(asFragment()).toMatchSnapshot();
   });
});