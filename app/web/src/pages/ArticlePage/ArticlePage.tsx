import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ArticleCell from 'src/components/ArticleCell'

interface Props {
  id: number
}

const ArticlePage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="Article" description="Article page" />

      <h2 className='c-title__lv2'>ArticlePage</h2>
      <hr />
      <ArticleCell id={id} />
    </>
  )
}

export default ArticlePage
