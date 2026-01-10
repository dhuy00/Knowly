import React from 'react'
import { RiHome2Line } from 'react-icons/ri'

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadCumbProps {
  path: BreadcrumbItem[]
}

const BreadCumb: React.FC<BreadCumbProps> = ({ path }) => {
  return (
    <div className="flex items-center gap-1 text-sm">
      <RiHome2Line className="text-text-secondary" />

      {path.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-text-secondary">/</span>

          {item.href && !item.active ? (
            <a
              href={item.href}
              className="text-text-secondary hover:text-black transition"
            >
              {item.label}
            </a>
          ) : (
            <span
              className={
                item.active
                  ? 'text-black font-medium'
                  : 'text-text-secondary'
              }
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default BreadCumb
