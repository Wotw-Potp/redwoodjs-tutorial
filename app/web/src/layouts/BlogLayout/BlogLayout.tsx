import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Toaster />
      <header className="py-4 px-10 xl:px-14 flex items-center justify-between bg-sky-700 text-white">
        <h1 className="font-bold">
          <Link to={routes.home()}>RedwoodJs Tutorial</Link>
        </h1>
        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="text-xs">
                Logged in as{' '}
                <span className="text-sm font-bold">{currentUser.email}</span>
              </div>
              <button
                type="button"
                onClick={logOut}
                className="u-link__btn --green"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()} className="u-link__btn --green">
              Login
            </Link>
          )}
          <ul className="flex items-center gap-2">
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="mx-auto py-10 px-12 2xl:max-w-6xl max-w-4xl">
          {children}
        </div>
      </main>
    </>
  )
}

export default BlogLayout
