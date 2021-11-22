import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebase, { database } from "../../firebase";
import { getDatabase, ref, set, push, onValue, remove} from "firebase/database";

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: 'CHANGE_USER', value: ' oneng' })
    }, 2000)
}

export const registerUseAPI = (data) => (dispatch) => {
    dispatch({ type: 'CHANGE_LOADING', value: true })
    const auth = getAuth(firebase);
    return (
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
                dispatch({ type: 'CHANGE_LOADING', value: false })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })

            })
    )
}

export const loginUseAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(`sucsses`, user)
                const dataUser = {
                    email: user.email,
                    uid: user.uid,
                    emailVerified: user.emailVerified,
                    refreshToken: user.refreshToken
                }
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: true })
                dispatch({ type: 'CHANGE_USER', value: dataUser })
                resolve(dataUser)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: false })
                reject(false)
            })
    })
}

export const addDataToAPI = (data) => (dispatch) => {
    const db = getDatabase(firebase);
    push(ref(db, 'notes/' + data.userId), {
        title: data.title,
        content: data.content,
        date: data.date

    })
}

export const getDataFromAPI = (userId) => (dispatch) => {
    const db = getDatabase();
    const starCountRef = ref(db, 'notes/' + userId);
    return new Promise((resolve, reject) => {
        onValue(starCountRef, (snapshot) => {
            console.log('get data: ', snapshot.val());
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            });

            dispatch({ type: 'SET_NOTES', value: data });
            resolve(snapshot.val())
        });
    })
}

export const updateDataAPI = (data) => (dispatch) => {
    const db = getDatabase();
    const starCountRef = ref(db, `notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject) => {
        set(starCountRef, {
            title: data.title,
            content: data.content,
            date: data.date
        }).then(res => {
            console.log(`res`, res)
        }).catch(err => {
            console.log(`err`, err)
        })
        // starCountRef.set({
        //     title: data.title,
        //     content: data.content,
        //     date: data.date
        // }, (err) => {
        //     if (err) {
        //         reject(false);
        //     } else {
        //         resolve(true)
        //     }
        // });
    })
}

export const deleteDataAPI = (data) => (dispatch) => {
    const db = getDatabase();
    const starCountRef = ref(db, `notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject) => {
        remove(starCountRef)
        .then(res => {
            console.log(`res`, res)
        }).catch(err => {
            console.log(`err`, err)
        })
    })
}