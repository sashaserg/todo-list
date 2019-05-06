/* library */
import { observable, action } from 'mobx';

/* firebase */
import firebase from '../firebase.js';

class ShoppingListStore {
    @observable isFetching;

    @observable shopItems;
    @observable budget;
    @observable spent;
    @observable shopListKey;

    constructor() {
        this.isFetching = false;
        this.shopItems = null;
        this.budget = 0;
        this.spent = 0;
    }

    // Fetching shopping list by userId and setting listeners to value change and remove shopping item. 
    @action('fetch shop list by user id')
    findShoppingListByUserId(userId) {
        console.log('userId from google', userId)
        const shopListRef = firebase.database().ref('ShoppingList');
        const query = shopListRef.orderByChild('userId').equalTo(userId);

        query.once('value', (snap) => {
            if (snap.val() == null) {
                shopListRef.push({
                    userId: userId,
                    spent: 0,
                    budget: 0,
                })
                .then((snap) => {
                    this.shopListKey = snap.key;
                    this.shopItems = [];
                    this.subscribeShopListToValueChange(snap.key);
                });
            }
            else {
                const shopListKey = Object.keys(snap.val())[0];
                this.shopListKey = shopListKey;
                this.subscribeShopListToValueChange(shopListKey);
            }
        });
        
    }

    subscribeShopListToValueChange (shopListKey) {
        const shopListRef = firebase.database().ref('ShoppingList').child(shopListKey);
        shopListRef.on('value', (snapshot) => {
            this.isFetching = true;
            if (snapshot.val())
            {
                console.log('snapshot to current list', snapshot.val());
                let items = snapshot.val().ShoppingItem;
                console.log('shopping items', items);
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
            }
            this.isFetching = false;
        });
        
        shopListRef.child('ShoppingItem').on('child_removed', (oldChild) => {
            if (oldChild.val().isDone)
                shopListRef.once('value')
                    .then((snapshot) => {
                        const oldSpent = snapshot.val().spent;
                        shopListRef.update({
                            spent: oldSpent - oldChild.val().amount * oldChild.val().cost,
                        })
                    })
        });
    }

    // Current shop list key stored here as observable variable 'shopListKey'. 
    @action('add new shopping item')
    addNewShopItemToCurrentShopList(item) {
        return new Promise((res, rej) => {
            this.isFetching = true;
            const itemsRef = firebase.database().ref(`/ShoppingList/${this.shopListKey}/ShoppingItem`);
            itemsRef.push(item, (err) => {
                if (err)
                    rej(err);
                else res();
                this.isFetching = false;
            });
        });
    }

    @action('update shopping item')
    updateShopItem(itemId, fieldName, fieldValue) {
        return new Promise((res, rej) => {
            this.isFetching = true;
        
            const itemRef = firebase.database().ref(`/ShoppingList/${this.shopListKey}/ShoppingItem/${itemId}`);
            itemRef.update({
                [fieldName]: fieldValue 
            }, (err) => {
                if (err) 
                    rej(err);
                else res();
                this.isFetching = false;
            });
        })
    }

    @action('update budget')
    updateBudget(value) {
        return new Promise((res, rej) => {
            const listRef = firebase.database().ref('ShoppingList').child(this.shopListKey);
            listRef.update({
                budget: parseFloat(value),
            }, (err) => {
                if (err)
                    rej(err);
                else res();
            })
        });
    }

    @action('update item isDone status')
    updateIsDoneShopItem(itemId) {
        return new Promise((res,rej) => {
            const itemRef = firebase.database().ref('ShoppingList').child(this.shopListKey);

            itemRef.once('value').then( (snapshot) => {
                const itemIsDone = !snapshot.val().ShoppingItem[itemId].isDone;
                const spent = snapshot.val().spent;
                let sumAddToSpent = snapshot.val().ShoppingItem[itemId].cost *
                                    snapshot.val().ShoppingItem[itemId].amount;
                                
                // If we change done to undone, we should subtract amount*cost from total spent
                if( !itemIsDone ) sumAddToSpent *= -1;

                itemRef.child('ShoppingItem').child( itemId ).update({
                    isDone: itemIsDone
                });

                itemRef.update({
                    spent: spent + sumAddToSpent,
                }, (err) => {
                    if(err) rej(err);
                    else res();
                });

            });
        })
    }

    @action('remove shopping item')
    removeShopItem(itemId) {
        return new Promise((res,rej) => {
            const itemRef = firebase.database().ref(`/ShoppingList/${this.shopListKey}/ShoppingItem/${itemId}`);
            itemRef.remove((err) => {
                if (err) rej(err);
                else res(); 
            });
        })
    }


}

export default new ShoppingListStore();