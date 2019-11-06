export const GET_PHOTOS = "GET_PHOTOS"

export const getPhotos = (photos) => {
    return {
        type: GET_PHOTOS,
        photos: photos
    }
}