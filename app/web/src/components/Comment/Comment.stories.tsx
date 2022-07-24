import Comment from './Comment'

export const generated = () => {
  return (
    <Comment
      comment={{
        name: 'Testman',
        body: 'First comment here.',
        createdAt: '2022-07-21T12:11:21Z',
      }}
    />
  )
}

export default { title: 'Components/Comment' }
