import { observable, action } from 'mobx';
import firebase from '../firebase.js';

class ShoppingListStore {
    @observable isFetching;

    @observable shopItems;
    @observable budget;
    @observable spent;

    constructor() {
        this.fetchShoppingList();
    }

    @action('connect to firebase ShoppingList')
    fetchShoppingList() {
        this.isFetching = true;
        const itemsRef = firebase.database().ref('ShoppingList');
        itemsRef.once('value', (snapshot) => {
            if (snapshot.val() == null)
                itemsRef.set({
                spent: 0,
                });
            else if (snapshot.val().spent == null)
            {
                itemsRef.update({
                spent: 0,
                })
            }
    
            });
            
        itemsRef.on('value', (snapshot) => {
            this.isFetching = true;
        if (snapshot.val())
        {
            let items = snapshot.val().ShoppingItem;
            let newShopItems = [];
            for (let item in items) {
            newShopItems.push({
                id: item,
                name: items[item].name,
                amount: items[item].amount,
                cost: items[item].cost,
                isDone: items[item].isDone,
            });
            };

            const budget = snapshot.val().budget;
            const spent = snapshot.val().spent;

            this.shopItems = newShopItems;
            this.budget = budget;
            this.spent = spent;
            this.isFetching = false;
        }
        });
        
        itemsRef.child('ShoppingItem').on('child_removed', (oldChild) => {
        if (oldChild.val().isDone)
            itemsRef.once('value')
            .then((snapshot) => {
                const oldSpent = snapshot.val().spent;
                itemsRef.update({
                spent: oldSpent - oldChild.val().amount * oldChild.val().cost,
                })
            })
        });

    }
}

export default new ShoppingListStore();