import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReplyForm from './index';

afterEach(cleanup);

describe('ReplyForm component renders', () => {

   it('renders', () => {
      render(<ReplyForm />);
   });

   it('Matches snapshot DOM node structure', () => {
      const { asFragment } = render(<ReplyForm />);
      expect(asFragment()).toMatchSnapshot();
   });
});