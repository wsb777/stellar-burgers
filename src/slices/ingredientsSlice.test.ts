import { ingredientsReducer, ingredientsThunk } from "./ingredientsSlice";
import { TIngredient } from '@utils-types';

describe('IngredientsSlice tests', () => {

    const initialState = {
        data: [],
        isLoading: false
      };
      const ingredient: TIngredient[] = [{
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
      }]

      it('loading ingredients', () => {
        const actualState = ingredientsReducer(initialState, ingredientsThunk.pending(''))
        const expectedState = {...initialState, isLoading: true}
        expect(actualState).toEqual(expectedState)
      })

      it('error ingredients', () => {
        const actualState = ingredientsReducer(initialState, ingredientsThunk.rejected(new Error,''))
        const expectedState = {...initialState, isLoading: false}
        expect(actualState).toEqual(expectedState)
      })

      it('fulfilled ingredients', () => {
        const actualState = ingredientsReducer(initialState, ingredientsThunk.fulfilled(ingredient,''))
        const expectedState = {data:ingredient, isLoading: false}
        expect(actualState).toEqual(expectedState)
      })
})