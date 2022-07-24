import { Link, routes } from '@redwoodjs/router'
import type { Post } from 'types/graphql'
import CommentsCell from 'src/components/CommentsCell'
import CommentForm from 'src/components/CommentForm'

interface Props {
  article: Omit<Post, 'createdAt'>
  summary?: boolean
}

const truncate = (text: string, length: number) => {
  return text.substring(0, length) + '...'
}

const Article = ({ article, summary = false }: Props) => {
  return (
    <article className="c-article">
      <header className='c-article__head'>
        <h3>
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h3>
      </header>
      <div className="c-article__body">
        {summary ? truncate(article.body, 100) : article.body}
      </div>
      {!summary && (
        <div className="mt-12 p-5">
          <CommentForm postId={article.id} />
          <div className="mt-12 py-5">
            <CommentsCell postId={article.id} />
          </div>
        </div>
      )}
    </article>
  )
}

export default Article
