import { endsWith, includes } from 'lodash'
import { findDOMNode } from 'react-dom'

const cache = new WeakMap()
export default function ref(component, name, useNode = true) {
  if (!cache.has(component)) {
    cache.set(component, {})
  }

  const functions = cache.get(component)
  if (!functions.hasOwnProperty(name)) {
    const plural = endsWith(name, 's')
    const reference = plural ? pluralReference : singularReference
    functions[name] = reference
  }

  return functions[name]

  function singularReference(c) {
    if (!c) return
    const node = useNode ? findDOMNode(c) : c
    component[name] = node
  }

  function pluralReference(c) {
    if (!component[name]) component[name] = []
    if (!c) return

    const node = useNode ? findDOMNode(c) : c
    if (!includes(component[name], node)) component[name].push(node)
  }
}
