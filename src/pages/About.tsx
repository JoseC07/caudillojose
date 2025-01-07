import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | My Tech Journey</title>
        <meta
          name="description"
          content="Learn about my experience in the tech industry, including skills, projects, and roles."
        />
      </Helmet>

      <div className="h-screen w-full bg-gray-900 text-white flex items-center justify-center">
        <h1>About Page</h1>
      </div>
    </>
  )
} 