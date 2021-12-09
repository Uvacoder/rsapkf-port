import axios from 'axios'

import {MASTODON_ID} from '../constants'
const baseUrl = 'https://mastodon.social/api/v1/'

export const fetchData = async () => {
  try {
    const result = await axios({
      method: 'get',
      url: `${baseUrl}accounts/${MASTODON_ID}/statuses`,
      timeout: 3000,
    })
    return result.data
  } catch (error) {
    return error.message
  }
}
