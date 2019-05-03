/* library */
import { observable, action } from "mobx";

/* firebase */
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