import type { CommentsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Comment from '../Comment/Comment'

export const QUERY = gql`
  query CommentsQuery($postId: Int!) {
    comments(postId: $postId) {
      id
      name
      body
      postId
      createdAt
    }
  }
`

export const Loading = () => <div className="text-center">Loading...</div>

export const Empty = () => <div className="text-center">No comments yet</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-center" style={{ color: 'red' }}>
    Error: {error.message}
  </div>
)

export const Success = ({ comments }: CellSuccessProps<CommentsQuery>) => {
  return (
    <ul className="space-y-8">
      {comments.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  )
}
