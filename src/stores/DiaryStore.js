/* library */
import { observable, action } from 'mobx';

/* firebase */
import firebase from '../firebase.js';

class DiaryStore {
    @observable currentNote;
    @observable currentNoteKey;
    @observable diaryKey;
    @observable isFetching;

    constructor() {
        this.selectedDate = null;
        this.isFetching = false;
    }

    @action('fetch diary by userId and get diary key')
    fetchDiaryByUserId(userId){
        const diaryRef = firebase.database().ref('Diary');

        const query = diaryRef.orderByChild('userId').equalTo(userId);

        query.once('value', (snap) => {
            if(snap.val() == null)
                diaryRef.push({
                    userId,
                })
                .then((snap) => {
                    this.diaryKey = snap.key;
                    //this.subscribeDiaryToValueChange(snap.key);
                });
            else {
                // Harcoded
                const diaryKey = Object.keys(snap.val())[0];
                this.diaryKey = diaryKey;
                //this.subscribeDiaryToValueChange(diaryKey);
            }
        })
    }

    subscribeDiaryNoteToValueChange (noteKey) {
        const noteRef = firebase.database().ref('Diary').child(this.diaryKey).child(noteKey);
        noteRef.on('value', (snap) => {
            this.isFetching = true;
            if (snap.val()) {
                console.log('snapshot to current diary', snap.val());
                let note = snap.val();
                console.log("TCL: DiaryStore -> subscribeDiaryNoteToValueChange -> note", note);
                this.currentNote = note;
            }
            this.isFetching = false;
        })
    }

    unsubscribeDiaryNoteToValueChange (noteKey) {
        firebase.database().ref('Diary').child(this.diaryKey).child(noteKey).off('value');
    }

    @action('get note by note key')
    changeCurrentNote(newNoteKey){
        if (this.currentNoteKey)
            unsubscribeDiaryNoteToValueChange(this.currentNoteKey);
        //const noteRef = firebase.database().ref('Diary').child(this.diaryKey).child(noteKey);
        subscribeDiaryNoteToValueChange(newNoteKey);

    }
}

export default new DiaryStore();