import { ProfileModel } from "../profile/profile.model";

export class SetUser{
    public static readonly type = '[app] set user';

    constructor(public payload: ProfileModel)
    {

    }
}
export class Navigate {
    static readonly type = '[router] navigate';
    constructor(public payload: string) {

    }
}