import { COUNTRIES } from "./constants"
import { database } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

function getCountry (countryId) {
    return COUNTRIES.filter(country => country.id === countryId)[0];
}
const usersCollectionRef = collection(database, 'users')

const getUserList = async () => {
    try { 
        const data = await getDocs(usersCollectionRef);
        return data.docs.map(doc=> ({...doc.data(), id: doc.id}));
    } catch (error) {
        console.error(error);
        return []
    }
}
const updateAUser = async (user) => {
    const userDoc = doc(database, 'users', user.id)
    delete user.id;
    return updateDoc(userDoc, user);
}
const saveNewUser = async (user) => {
    await addDoc(usersCollectionRef, user);
}
const deleteAUser = async (id) => {
    const userDoc = doc(database, 'users', id)
    await deleteDoc(userDoc)
}

export {getCountry, getUserList, deleteAUser, saveNewUser, updateAUser}