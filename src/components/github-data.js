import React, { useState, useEffect } from 'react'
import styles from './github-data.module.scss'
import { fetchGitHubData } from '../services/github-api'

const GitHubData = ({ project }) => {
  const [description, setDescription] = useState(project.description)
  const [homepage, setHomepage] = useState(project.homepage)
  const [stars, setStars] = useState(project.stars)
  const [forks, setForks] = useState(project.forks)

  const starsgazersUrl = `${project.repository}/stargazers`
  const forksUrl = `${project.repository}/network/members`

  useEffect(() => {
    const getData = async () => {
      const res = await fetchGitHubData(project)

      setDescription(res.description)
      setHomepage(res.homepage)
      setStars(res.stars)
      setForks(res.forks)
    }

    if (!project.private) getData(project)
  }, [project])

  return (
    <>
      <a
        href={`${homepage || project.repository}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {`${project.name}`}
      </a>
      :{' '}
      {description
        .replace("@rsapkf's ", '')
        .replace(/^\w/, c => c.toUpperCase())}
      <br />
      {!project.private && project.homepage && (
        <span>
          <a href={project.repository}>Source</a>
        </span>
      )}
      {project.builtWith && (
        <span>
          [<strong>{project.builtWith}</strong>]
        </span>
      )}
      {!project.private && stars > 0 && (
        <div className={styles.metrics}>
          <span className={styles.metric}>Stars</span>:{' '}
          <a href={starsgazersUrl} className={styles.metricCount}>
            {' '}
            {stars}
          </a>{' '}
          · <span className={styles.metric}>Forks</span>:{' '}
          <a href={forksUrl} className={styles.metricCount}>
            {' '}
            {forks}
          </a>
        </div>
      )}
    </>
  )
}

export default GitHubData
