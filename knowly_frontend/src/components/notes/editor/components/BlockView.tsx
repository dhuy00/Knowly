import React from 'react'
import type { Block } from '../../../../types/editor'
import TextView from './TextView'

type Props = {
  block: Block;
  onInput: (text: string, blockId: string) => void;
}

const BlockView = ({block, onInput}: Props) => {
  const Tag = block.type === "quote" ? "blockquote" : block.type === "heading" ? "h2" : "p";
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      data-block-id={block.id}
      onInput={e =>
        onInput(e.currentTarget.innerText, block.id)
      }>
       {block.children.map((node, i) => (
        <TextView key={i} node={node} />
      ))}
    </Tag>
  )
}

export default BlockView
