import app from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue, get, push, child } from "firebase/database";

const auth = getAuth(app);
const database = getDatabase(app);
const user = auth.currentUser;


let signUp = (obj) => {
    let { email, password } = obj;
    return createUserWithEmailAndPassword(auth, email, password)
}

let logIn = (obj) => {
    let { email, password } = obj;
    return signInWithEmailAndPassword(auth, email, password)
}

let logOut = () => {
    return signOut(auth);
}

let checkUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                resolve({ "id": uid, status: "User Found" })
            } else {
                resolve({ "id": "", status: "User Not Found!" })
            }
        });

    })

}


// Database methods

let sendData = (obj, nodeName, id) => {
    if (!id) {
        const postListRef = ref(database, 'posts');
        obj.id = push(postListRef).key;
    }
    let reference = ref(database, `${nodeName}/${obj.id ? obj.id : id}/`)
    return set(reference, obj);
}

let getData = (nodeName, id) => {

    let reference = ref(database)
    return get(child(reference, `${nodeName}/${id ? id : ""}`))
}

export {
    signUp,
    logIn,
    sendData,
    getData,
    logOut,
    checkUser
}
