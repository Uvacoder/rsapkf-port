import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import GitHubData from '../components/github-data'

import {projects} from '../data/projects'

const ProjectsPage = () => {
  return (
    <Layout>
      <SEO title="Projects" />
      <h2>Projects</h2>
      <div style={{marginBottom: '25px'}}>
        <a href="https://github.com/rsapkf">GitHub</a> ·{' '}
        <a href="https://gist.github.com/rsapkf">Gists</a>
      </div>
      <ul style={{listStyle: 'none', marginLeft: 'unset'}}>
        {projects.map(type => (
          <li key={type.label} style={{marginBottom: '1rem'}}>
            <h3>{type.label}</h3>
            <ul>
              {type.items.map(project => (
                <li key={project.name} style={{listStyle: 'disc'}}>
                  <GitHubData project={project} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default ProjectsPage
