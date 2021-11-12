import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../../firebase";

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
                console.log(`userCreential`, user)
                const dataUser = {
                    email: user.email,
                    uid: user.uid,
                    emailVerified: user.emailVerified
                }
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: true })
                dispatch({ type: 'CHANGE_USER', value: dataUser })
                resolve(true)
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