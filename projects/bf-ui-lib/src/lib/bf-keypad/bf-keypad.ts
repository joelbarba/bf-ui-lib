export interface KeyPad {
  primaryElement: string;
  secondaryElement: string;
  isSecondaryEnabled: boolean;
}

export const dialPadConfig: KeyPad[] = [
  { primaryElement: '1', secondaryElement: '',    isSecondaryEnabled: false },
  { primaryElement: '2', secondaryElement: 'abc', isSecondaryEnabled: false },
  { primaryElement: '3', secondaryElement: 'def', isSecondaryEnabled: false },
  { primaryElement: '4', secondaryElement: 'ghi', isSecondaryEnabled: false },
  { primaryElement: '5', secondaryElement: 'jkl', isSecondaryEnabled: false },
  { primaryElement: '6', secondaryElement: 'mno', isSecondaryEnabled: false },
  { primaryElement: '7', secondaryElement: 'pqrs',isSecondaryEnabled: false },
  { primaryElement: '8', secondaryElement: 'tuv', isSecondaryEnabled: false },
  { primaryElement: '9', secondaryElement: 'wxyz',isSecondaryEnabled: false },
  { primaryElement: '*', secondaryElement: '',    isSecondaryEnabled: false },
  { primaryElement: '0', secondaryElement: '+',   isSecondaryEnabled: true  },
  { primaryElement: '#', secondaryElement: '',    isSecondaryEnabled: false },
];
