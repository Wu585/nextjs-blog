import Link from "next/link"
import React from "react"
import Image from 'next/image'
import png from 'assets/images/img.png'

function HomePage() {
  return (
    <div>Welcome to Next.js!
      <h2>
        <Link href="/posts/first_post">
          <a>click here</a>
        </Link>
      </h2>
      <Image src={png}/>
    </div>
  )
}

export default HomePage
