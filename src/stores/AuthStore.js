/* library */
import { observable, action, autorun, computed } from "mobx";

/* firebase */
import firebase, { auth, provider } from '../firebase.js';

class AuthStore {
    @observable user;
    @observable isFetching;

    constructor() {
        this.user = null;
        this.isFetching = false;
        
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.user = user;
            } 
            this.isFetching = false;
        });

        // autorun(() => {;
        //     console.log('auth store', {fetching: this.isFetching, user: this.user, authWarning: this.showAuthWarning});
        // })

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