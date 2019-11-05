export const GET_LOCATION = "GET_LOCATION"

export const getLocation = (loc) => {
    return {
        type: GET_LOCATION,
        location: loc
    }
}