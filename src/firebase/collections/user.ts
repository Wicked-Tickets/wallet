import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";

export async function addUser(user: User) {
	try {
		debugger
		const userRef = await addDoc(collection(db, "users"), {
			data: user
		})
		
		return userRef.id
	} catch(e) {
		console.log("Error adding user: ", e)
	}
}