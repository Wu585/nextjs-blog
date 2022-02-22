import Link from "next/link";
import React from "react";

function FirstPost() {
  return <div>this is first post
    <h2>
      <Link href="/">
        <a>back to main page</a>
      </Link>
    </h2>
  </div>;
}

export default FirstPost
