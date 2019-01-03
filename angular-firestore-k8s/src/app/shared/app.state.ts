import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetUser } from './app.actions';

export interface AppStateModel {
    uid: string,
    name: string,
    email: string,
    picture: string
}

@State<AppStateModel>({
    name: 'app',
    defaults:
    {
        uid: '0',
        name: '',
        email: '',
        picture: ''
    }
})
export class AppState {

    @Selector()
    static getUserPicture(state: AppStateModel) {
        return state.picture;
    }
    @Selector()
    static getUserEmail(state: AppStateModel) {
        return state.email;
    }

    @Action(SetUser)
    setUser({setState}:StateContext<AppStateModel>, {payload}: SetUser) {
        setState({
            uid: payload.uid,
            name: payload.name,
            email: payload.email,
            picture: payload.picture
        });
    }
}