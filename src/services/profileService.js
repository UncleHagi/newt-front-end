import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function create(userActivity) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(userActivity)
  })
  return res.json()
}

async function getAll() {
  const res = await fetch(BASE_URL)
  return res.json()
}

async function addPhoto(photoData, profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoData
  })
  return await res.json()
}

export { getAllProfiles, addPhoto, create, getAll }
