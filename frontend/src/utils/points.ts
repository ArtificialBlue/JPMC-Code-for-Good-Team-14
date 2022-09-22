import { toast } from "react-toastify";
import { User } from "../components/types";

export async function addNewPoints(points: number): Promise<void> {
    let defaultUser = null;
    try {
      defaultUser = JSON.parse(localStorage.getItem('user') || '') as User || null
    } catch (e) { }
    
    if (defaultUser === null) return;

    const response = await fetch(`http://localhost:8000/users/${defaultUser._id}/points`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points: points })
    });
    toast.info(`You just got ${points} more points!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    console.log('new points response', await response.json());
}

export async function getUserByUserId(id: string): Promise<User> {

    const response = await fetch(`http://localhost:8000/usersById/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data: User = await response.json();
    console.log(data)
    return data;
}