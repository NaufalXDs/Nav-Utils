"use client"
import { useEffect, useState } from "react"

export default function CheckUser({ onGetAction }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        onGetAction().then((user) => setUser(user));
    }, [])

    return <div className="mt-10">
        <div className="flex justify-center items-center">
            Who Am i {user}
        </div>
    </div>
}