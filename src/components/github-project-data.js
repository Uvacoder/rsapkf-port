import React, {useState, useEffect} from 'react'
import styles from './github-project-data.module.scss'
import {fetchData} from '../services/github-api'

const GitHubProjectData = ({project}) => {
  const [starsCount, setStarsCount] = useState(0)
  const [forksCount, setForksCount] = useState(0)
  const [description, setDescription] = useState('')
  const [projectHomepage, setProjectHomepage] = useState('')

  const starsgazersUrl = `${project.repository}/stargazers`
  const forksUrl = `${project.repository}/network/members`

  useEffect(() => {
    const fetchGitHubData = async () => {
      const res = await fetchData(project)

      setDescription(res.description)
      setProjectHomepage(res.homepage)
      setStarsCount(res.stargazersCount)
      setForksCount(res.forksCount)
    }

    fetchGitHubData(project)
  }, [project])

  return (
    <>
      <a
        href={`${projectHomepage || project.repository}`}
      >{`${project.name}`}</a>
      :{' '}
      {description
        .replace("@rsapkf's ", '')
        .replace(/^\w/, c => c.toUpperCase())}
      <br />
      {!project.isPrivate && project.homepage && (
        <span>
          <a href={project.repository}>Source</a>
        </span>
      )}
      {project.builtWith && (
        <span>
          [<strong>{project.builtWith}</strong>]
        </span>
      )}
      {!project.isPrivate && starsCount > 0 && (
        <div className={styles.metrics}>
          <span className={styles.metric}>Stars</span>:{' '}
          <a href={starsgazersUrl} className={styles.metricCount}>
            {' '}
            {starsCount}
          </a>{' '}
          · <span className={styles.metric}>Forks</span>:{' '}
          <a href={forksUrl} className={styles.metricCount}>
            {' '}
            {forksCount}
          </a>
        </div>
      )}
    </>
  )
}

export default GitHubProjectData
