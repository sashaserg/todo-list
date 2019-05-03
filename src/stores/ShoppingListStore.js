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

    @action('fetch shop list by user id')
    findShoppingListByUserId(userId) {
        const shopListRef = firebase.database().ref('ShoppingList');
        const query = shopListRef.orderByChild('userId').equalTo(userId);

        query.once('value', (snap) => {
            if (snap.val() == null) {
                shopListRef.push({
                    userId: userId,
                    spent: 0,
                    budget: 0,
                });
            }
            else {
                
                // Harcoded
                const shopListKey = Object.keys(snap.val())[0];
                // console.log(shopListKey);
                const currentShopList = shopListRef.child(shopListKey);
                // console.log(currentShopList);

                currentShopList.on('value', (snapshot) => {
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
                    this.shopListKey = shopListKey;
                    this.isFetching = false;
                }
                });
                
                currentShopList.child('ShoppingItem').on('child_removed', (oldChild) => {
                    if (oldChild.val().isDone)
                        currentShopList.once('value')
                            .then((snapshot) => {
                                const oldSpent = snapshot.val().spent;
                                currentShopList.update({
                                    spent: oldSpent - oldChild.val().amount * oldChild.val().cost,
                                })
                            })
                });

            }
        });
        
    }

    @action('add new shopping item')
    addNewShopItemUserId(item, userId) {
        return new Promise((res, rej) => {
            const itemsRef = firebase.database().ref(`/ShoppingList/${this.shopListKey}/ShoppingItem`);
            console.log(itemsRef);
            itemsRef.push(item, (err) => {
                if (err)
                    rej(err);
                else res();
            });
        });
    }

    // Fetching shopping list and setting listeners to value change and remove shopping item. 
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

    @action('add new shopping item')
    addNewShopItem(item) {
        return new Promise((res, rej) => {
            const itemsRef = firebase.database().ref('ShoppingList').child('ShoppingItem');
            itemsRef.push(item, (err) => {
                if (err)
                    rej(err);
                else res();
            });
        });
    }

    @action('update shopping item')
    updateShopItem(itemId, fieldName, fieldValue) {
        const itemRef = firebase.database().ref(`/ShoppingList/ShoppingItem/${itemId}`);
        itemRef.update({
            [fieldName]: fieldValue 
        });
    }

    @action('update budget')
    updateBudget(value) {
        return new Promise((res, rej) => {
            const listRef = firebase.database().ref('ShoppingList');
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
            const itemRef = firebase.database().ref('ShoppingList');

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
            const itemRef = firebase.database().ref(`/ShoppingList/ShoppingItem/${itemId}`);
            itemRef.remove((err) => {
                if (err) rej(err);
                else res(); 
            });
        })
    }


}

export default new ShoppingListStore();