import { TUser } from "@utils-types";
import { authTokenThunk, checkUserAuth, logoutThunk, resetProfile, userLoginThunk, userReducer, userRegisterThunk } from "./userSlice";
import { TRegisterData } from "@api";

describe('userSlice tests', ()=> {
    type userState = {
        data: TUser | null;
        isLoading: boolean;
        isAuthChecked: boolean;
        success: boolean;
        password: string;
    };
      
    const initialState: userState = {
        data: null,
        password: '',
        isAuthChecked: false,
        isLoading: true,
        success: false
    };

    const user:TUser = {
         email: "test@test.test",
         name: "tester"
    }

    const resetUser:TUser = {
        email: "test@test.test",
        name: "testerNumber2"
   }

    const stateWithUser = {...initialState, data: user}

    it('checkUserAuth', () => {
        const actualState = userReducer(initialState, checkUserAuth());
        const expectedState = {...initialState, isAuthChecked:true};
        expect(actualState).toEqual(expectedState)
    })

    it('loading userRegisterThunk', () => {
        const actualState = userReducer(initialState, userRegisterThunk.pending('',{...user, password:'test'}));
        const expectedState = {...initialState, isLoading: false}
        expect(actualState).toEqual(expectedState)
    })

    it('error userRegisterThunk', () => {
        const actualState = userReducer(initialState, userRegisterThunk.rejected(new Error,'',{...user, password:'test'}));
        const expectedState = {...initialState, isLoading: true}
        expect(actualState).toEqual(expectedState)
    })

    it('fulfilled userRegisterThunk', () => {
        const actualState = userReducer(initialState, userRegisterThunk.fulfilled(user,'',{...user, password:'test'}));
        const expectedState = {...initialState, isLoading: true, data: user}
        expect(actualState).toEqual(expectedState)
    })

    it('loading userLoginThunk', () => {
        const actualState = userReducer(initialState, userLoginThunk.pending('',{...user, password:'test'}));
        const expectedState = {...initialState, isLoading: false}
        expect(actualState).toEqual(expectedState)
    })

    it('error userLoginThunk', () => {
        const actualState = userReducer(initialState, userLoginThunk.rejected(new Error,'',{...user, password:'test'}));
        const expectedState = {...initialState, isLoading: true}
        expect(actualState).toEqual(expectedState)
    })

    it('fulfilled userLoginThunk', () => {
        const actualState = userReducer(initialState, userLoginThunk.fulfilled(user,'',{...user, password:'test'}));
        const expectedState = {...initialState, isLoading: true, data: user}
        expect(actualState).toEqual(expectedState)
    })

    it('loading authTokenThunk', () => {
        const actualState = userReducer(initialState, authTokenThunk.pending(''));
        const expectedState = {...initialState, isLoading: false}
        expect(actualState).toEqual(expectedState)
    })

    it('error authTokenThunk', () => {
        const actualState = userReducer(initialState, authTokenThunk.rejected(new Error,''));
        const expectedState = {...initialState, isLoading: true}
        expect(actualState).toEqual(expectedState)
    })

    it('fulfilled authTokenThunk', () => {
        const actualState = userReducer(initialState, authTokenThunk.fulfilled(user,''));
        const expectedState = {...initialState, isLoading: true, data: user}
        expect(actualState).toEqual(expectedState)
    })

    it('loading logoutThunk', () => {
        const actualState = userReducer(stateWithUser, logoutThunk.pending(''));
        const expectedState = {...stateWithUser, isLoading: false}
        expect(actualState).toEqual(expectedState)
    })

    it('error logoutThunk', () => {
        const actualState = userReducer(stateWithUser, logoutThunk.rejected(new Error,''));
        const expectedState = {...stateWithUser, isLoading: true}
        expect(actualState).toEqual(expectedState)
    })

    it('fulfilled logoutThunk', () => {
        const actualState = userReducer(stateWithUser, logoutThunk.fulfilled({success:true},''));
        const expectedState = {...stateWithUser, isLoading: true, data:null, success:true}
        expect(actualState).toEqual(expectedState)
    })

    it('fulfilled resetProfile', () => {
        const actualState = userReducer(stateWithUser, resetProfile.fulfilled({user: {...resetUser}, success:true},'',{...user, password:'test1'}));
        const expectedState = {...stateWithUser, isLoading: true, data:{...resetUser}}
        expect(actualState).toEqual(expectedState)
    })
})