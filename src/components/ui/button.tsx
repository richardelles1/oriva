import * as React from 'react'

export function Button({
  className = '',
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
