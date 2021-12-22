import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { copyToClipboard } from '../utils/copy-to-clipboard'
import styles from './copy-permalink.module.scss'

export const CopyPermalink = ({ link }) => {
  const [permalinkButtonText, setPermalinkButtonText] = useState('Permalink')
  return (
    <button
      className={styles.clipboardSpan}
      onClick={() => {
        copyToClipboard(link)
        setPermalinkButtonText('Copied')
        setTimeout(() => setPermalinkButtonText('Permalink'), 1500)
      }}
    >
      {permalinkButtonText}
    </button>
  )
}

export const CopyPermalinkIcon = ({ link }) => {
  const [permalinkButtonIcon, setPermalinkButtonIcon] = useState([
    'far',
    'copy',
  ])
  return (
    <button
      className={styles.clipboardIcon}
      title={'Copy permalink to clipboard'}
      onClick={() => {
        copyToClipboard(link)
        setPermalinkButtonIcon(['fas', 'check'])
        setTimeout(() => setPermalinkButtonIcon(['far', 'copy']), 1500)
      }}
    >
      <FontAwesomeIcon icon={permalinkButtonIcon} />
    </button>
  )
}
