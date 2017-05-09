import React from 'react'

export default function highlight(words, key, className = '') {
  return words.split(' ').map((word) => {
    if (word === key) return <span key={word} className={className}>{word} </span>
    else return word + ' '
  })
}
