import axios from 'axios'

import {GITHUB_USERNAME} from '../constants'
const baseUrl = 'https://api.github.com/'

export const fetchGitHubData = async project => {
  const repo = project.repository.replace('https://github.com/rsapkf/', '')

  try {
    const {
      data: {
        description,
        homepage,
        stargazers_count: stars,
        forks_count: forks,
      },
    } = await axios({
      method: 'get',
      url: `${baseUrl}repos/${GITHUB_USERNAME}/${repo}`,
      timeout: 2000,
      headers: {
        Authorization: `token ${process.env.GATSBY_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    })

    return {
      description,
      homepage,
      stars,
      forks,
    }
  } catch (error) {
    return project
  }
}
