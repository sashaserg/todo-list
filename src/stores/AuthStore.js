import { observable, action } from "mobx";
import firebase, { auth, provider } from '../firebase.js';

class AuthStore {
    @observable user;
    
    constructor() {
        this.user = null;
    }

    @action('login')
    login() {
        auth.signInWithPopup(provider) 
            .then((result) => {
                console.log(result.user);
                const user = result.user;
                this.user = user;
            });
    }

    @action('logout')
    logout() {
        auth.signOut()
            .then(() => {
                this.user = null;
            });
    }
}
export default new AuthStore();