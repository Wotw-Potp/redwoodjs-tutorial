import {
  Form,
  FormError,
  Submit,
  SubmitHandler,
  TextField,
  TextAreaField,
  FieldError,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

interface FormValues {
  name: string
  email: string
  message: string
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, { loading, error }] = useMutation<
      CreateContactMutation,
      CreateContactMutationVariables
    >(CREATE_CONTACT, {
      onCompleted: () => {
        toast.success('Thank you for your submission !!')
        formMethods.reset()
      },
    }),
    formMethods = useForm()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />

      <h2 className="c-title__lv2">ContactPage</h2>
      <hr />
      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
        className="mt-4 w-full"
      >
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />
        <ul className='space-y-6'>
          <li>
            <div>
              <label htmlFor="name" className="c-form__label">
                Name
              </label>
            </div>
            <div>
              <TextField
                name="name"
                validation={{ required: true }}
                errorClassName="error"
                className="c-form__field"
              />
            </div>
            <div>
              <FieldError name="name" className="error" />
            </div>
          </li>
          <li>
            <div>
              <label htmlFor="email" className="c-form__label">
                Email
              </label>
            </div>
            <div>
              <TextField
                name="email"
                validation={{
                  required: true,
                  pattern: {
                    value: /^[^@]+@[^.]+\..+$/,
                    message: 'Please enter a valid email address',
                  },
                }}
                errorClassName="error"
                className="c-form__field"
              />
            </div>
            <div>
              <FieldError name="email" className="error" />
            </div>
          </li>
          <li>
            <div>
              <label htmlFor="message" className='c-form__label'>Message</label>
            </div>
            <div>
              <TextAreaField
                name="message"
                validation={{ required: true }}
                errorClassName="error"
                className="c-form__field h-24"
              />
            </div>
            <div>
              <FieldError name="message" className="error" />
            </div>
          </li>
        </ul>
        <Submit disabled={loading} className="c-form__submit">
          Submit
        </Submit>
      </Form>
    </>
  )
}

export default ContactPage
