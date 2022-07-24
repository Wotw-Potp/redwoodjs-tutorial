import type { QueryResolvers, CommentResolvers } from 'types/graphql'
import { requireAuth } from 'src/lib/auth'

import { db } from 'src/lib/db'

interface CreateCommentArgs {
  input: Prisma.CommentCreateInput
}

export const comments = ({
  postId,
}: Required<Pick<Prisma.CommentWhereInput, 'postId'>>) => {
  return db.comment.findMany({ where: { postId } })
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const Comment: CommentResolvers = {
  post: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).post(),
}

export const createComment = ({ input }: CreateCommentArgs) => {
  return db.comment.create({
    data: input,
  })
}

export const deleteComment = ({ id }: Prisma.CommentWhereUniqueInput) => {
  requireAuth({ roles: 'moderator' })
  return db.comment.delete({
    where: { id },
  })
}
