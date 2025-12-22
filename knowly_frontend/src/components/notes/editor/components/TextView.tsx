import React from 'react'
import type { TextNode } from '../../../../types/editor'

const TextView = ({node}: {node: TextNode}) => {
  let content: React.ReactNode = node.text || "\u00A0";

  if(node.bold) content = <strong>{content}</strong>
  if(node.italic) content = <em>{content}</em>
  if(node.highlight) content = <mark>{content}</mark>;

  return (
    <span>
      {content}
    </span>
  )
}

export default TextView
