import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h2 className='c-title__lv2'>Articles</h2>
      <hr />
      <ArticlesCell />
    </>
  )
}

export default HomePage
