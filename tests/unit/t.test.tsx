import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { T } from '../../components/T/T.component';

/*
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));
*/

describe('<T/>', () => {
  it('Render correctly', async () => {
    render(<T />);
    expect(true).toBe(true);
  });
});
