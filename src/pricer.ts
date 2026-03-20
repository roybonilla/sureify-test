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

type SizeOption = 'small' | 'medium' | 'large';
type CreamerOption = 'none' | 'dairy' | 'non-dairy';

// /** Immutable size pricing record — it is frozen to avoid modification at runtime. */
const SIZE_PRICE_MAP: Record<SizeOption, Price> = Object.freeze({
  small: 1,
  medium: 1.5,
  large: 2,
});

// /** Immutable creamer pricing record — it is frozen to avoid modification at runtime. */
const CREAMER_PRICE_MAP: Record<CreamerOption, Price> = Object.freeze({
  none: 0,
  dairy: 0.25,
  'non-dairy': 0.5,
});

type SelectionState = {
  size?: SizeOption;
  creamer?: CreamerOption;
};

/**
* A new pricer is created for each coffee being purchased.
*/
export const createPricer = (): Pricer => {
  let selection: SelectionState = {};

  return (category: Category, option: Option): Price => {
    selection =
      category === 'size'
        ? { ...selection, size: option as SelectionState['size'] }
        : { ...selection, creamer: option as SelectionState['creamer'] };

    const sizePrice = selection.size ? SIZE_PRICE_MAP[selection.size] : 0;
    const creamerPrice = selection.creamer ? CREAMER_PRICE_MAP[selection.creamer] : 0;

    return sizePrice + creamerPrice;
  };
};
