import { BfDropdownA11yPipe } from './bf-dropdown-a11y.pipe';

describe('BfDropdownA11y Pipe', () => {
  let pipe: BfDropdownA11yPipe;

  beforeEach(() => {
    pipe = new BfDropdownA11yPipe();
  });

  it('should only return a list of items that are matches', () => {
    const result = pipe.transform([
      { $isMatch: true },
      { $isMatch: false },
      { $isMatch: false },
      { $isMatch: true }
    ]);

    expect(result.length).toBe(2);
  });
});
