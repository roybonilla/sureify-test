export type Category = 'size' | 'creamer';
export type Option = 'small' | 'medium' | 'large' | 'none' | 'dairy' |
'non-dairy';
export type Price = number;

export interface Pricer {
  /**
  * Invoked each time the user makes a selection.
  * No need to validate arguments, the caller validates the
  arguments before this function is invoked.
  * @returns the _total_ price of the coffee so far given all the
  selections made
  */
  (category: Category, option: Option): Price
}

// /** Immutable size pricing record — it is frozen to avoid modification at runtime. */
const SIZE_PRICES: Record<'small' | 'medium' | 'large', Price> = Object.freeze({
  small: 1,
  medium: 1.5,
  large: 2,
});

// /** Immutable creamer pricing record — it is frozen to avoid modification at runtime. */
const CREAMER_PRICES: Record<'none' | 'dairy' | 'non-dairy', Price> = Object.freeze({
  none: 0,
  dairy: 0.25,
  'non-dairy': 0.5,
});

type SelectionState = {
  size?: 'small' | 'medium' | 'large';
  creamer?: 'none' | 'dairy' | 'non-dairy';
};

/**
* A new pricer is created for each coffee being purchased.
*/
export const createPricer = (): Pricer => {
  let state: SelectionState = {};

  return (category: Category, option: Option): Price => {
    state =
      category === 'size'
        ? { ...state, size: option as SelectionState['size'] }
        : { ...state, creamer: option as SelectionState['creamer'] };

    const sizePrice = state.size ? SIZE_PRICES[state.size] : 0;
    const creamerPrice = state.creamer ? CREAMER_PRICES[state.creamer] : 0;

    return sizePrice + creamerPrice;
  };
}
