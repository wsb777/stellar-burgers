import { feedReducer, feedThunk } from "./feedSlice";

describe("feedSlice tests", () => {
    const initialState = {
        data: {
          orders: [],
          total: NaN,
          totalToday: NaN
        },
        isLoading: true
      };
    
    const data = {
        success: true,
        orders: [
            {
                _id: "671519b4d829be001c7774bb",
                ingredients: [
                    "643d69a5c3f7b9001cfa093d",
                    "643d69a5c3f7b9001cfa0943",
                    "643d69a5c3f7b9001cfa0945",
                    "643d69a5c3f7b9001cfa0943",
                    "643d69a5c3f7b9001cfa0943",
                    "643d69a5c3f7b9001cfa0945",
                    "643d69a5c3f7b9001cfa0943",
                    "643d69a5c3f7b9001cfa093d"
                ],
                status: "done",
                name: "Space флюоресцентный антарианский бургер",
                createdAt: "2024-10-20T14:54:44.093Z",
                updatedAt: "2024-10-20T14:54:44.919Z",
                number: 57015
            }
        ],
        total: 56641,
        totalToday: 100
        }

    it('loading feed', () => {
        const actualState = feedReducer(initialState, feedThunk.pending(''))
        const expectedState = {...initialState, isLoading: true}
        expect(actualState).toEqual(expectedState)
    })

    it('error feed', () => {
        const actualState = feedReducer(initialState, feedThunk.rejected(new Error, ''))
        const expectedState = {...initialState, isLoading: false}
        expect(actualState).toEqual(expectedState)
    })

    it('fulfilled feed', () => {
        const actualState = feedReducer(initialState, feedThunk.fulfilled(data, ''))
        const expectedState = {...initialState, isLoading: false, data:{...data}}
        expect(actualState).toEqual(expectedState)
    })
})