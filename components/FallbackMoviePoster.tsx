'use client'

import React from 'react'

interface FallbackMoviePosterProps {
  width?: number
  height?: number
}

const FallbackMoviePoster: React.FC<FallbackMoviePosterProps> = ({ width = 200, height = 300 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="300" fill="#1F2937" />
      <path
        d="M100 70C88.9543 70 80 78.9543 80 90C80 101.046 88.9543 110 100 110C111.046 110 120 101.046 120 90C120 78.9543 111.046 70 100 70ZM100 105C91.7157 105 85 98.2843 85 90C85 81.7157 91.7157 75 100 75C108.284 75 115 81.7157 115 90C115 98.2843 108.284 105 100 105Z"
        fill="#E5E7EB"
      />
      <path
        d="M65 140V240H135V140H65ZM130 235H70V145H130V235Z"
        fill="#E5E7EB"
      />
      <text
        x="100"
        y="280"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fill="#E5E7EB"
        textAnchor="middle"
      >
        No Image Available
      </text>
    </svg>
  )
}

export default FallbackMoviePoster