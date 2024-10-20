import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  addIngridient,
  constructorReducer,
  deleteIngridient,
  moveIngrident
} from './contructorSlice';
import { v4 } from 'uuid';
jest.mock('uuid');

describe('constructorSlice', () => {
  beforeEach(() => {
    (v4 as jest.Mock).mockReturnValue('4');
  });

  type TConstructorState = {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };

  type TMove = {
    index: number;
    side: string;
  };

  const ingredient = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  };

  const initialState: TConstructorState = JSON.parse(
    '{"bun":null,"ingredients":[]}'
  );

  it('Add ingredient', async () => {
    const expectedState = {
      bun: {
        _id: '643d69a5c3f7b9001cfa093d',
        id: '4',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      },
      ingredients: []
    };
    const actualState = await constructorReducer(
      initialState,
      addIngridient(ingredient)
    );
    expect(actualState).toEqual(expectedState);
  });
  it('Delete ingredient', async () => {
    const state = {
      bun: null,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          id: '4',
          name: 'Флюоресцентная булка R2-D3',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        }
      ]
    };
    const expectedState = {
      bun: null,
      ingredients: []
    };
    const actualState = await constructorReducer(state, deleteIngridient(0));
    expect(actualState).toEqual(expectedState);
  });

  it('Move ingredient', async () => {
    const state = {
      bun: null,
      ingredients: [
        {
          _id: '2',
          id: '4',
          name: 'Ингредиент 2',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        },
        {
          _id: '3',
          id: '4',
          name: 'Ингредиент 3',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
        }
      ]
    };
    const expectedState = {
      bun: null,
      ingredients: [
        {
          _id: '3',
          id: '4',
          name: 'Ингредиент 3',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
        },
        {
          _id: '2',
          id: '4',
          name: 'Ингредиент 2',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ]
    };
    const actualState = await constructorReducer(
      state,
      moveIngrident({ index: 1, side: 'up' })
    );
    expect(actualState).toEqual(expectedState);
  });
});
