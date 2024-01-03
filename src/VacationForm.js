import React, {useState} from "react";

const VacationForm = ({users, places, bookVacation}) => {

    const [placeId, setPlaceId] = useState('')
    const [userId, setUserId] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        const vacation = {
            user_id: userId,
            place_id: placeId
        }
        console.log(vacation)
        bookVacation(vacation)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <select value={userId} onChange={(e) => {setUserId(e.target.value)}}>
                    <option value=''>-- Choose a User --</option>
                    {
                        users.map((user) => {
                            return(
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        })
                    }
                </select>

                <select value={placeId} onChange={(e) => {setPlaceId(e.target.value)}}>
                    <option value=''>-- Choose A Place --</option>
                    {
                        places.map((place) => {
                            return(
                                <option key={place.id} value={place.id}>{place.name}</option>
                            )
                        })
                    }
                </select>
                <button type="submit" disabled={ !placeId || ! userId} >Book Vacation</button>

            </form>
        </div>
    )

}

export default VacationForm