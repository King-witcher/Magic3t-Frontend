import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/layout'
import ProfilePage from './pages/profile/page'
import GamePage from './pages/game/[gameId]/page'
import Home from './pages/(home)/page'
import NotFound from './pages/not-found'
import TutorialPage from './pages/tutorial/page'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider
    router={createBrowserRouter([
      {
        path: '/',
        element: <Layout />,
        errorElement: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/tutorial',
            element: <TutorialPage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          {
            path: '/game/:gameId',
            element: <GamePage />,
          },
          {
            path: '/*',
            element: <NotFound />,
          },
        ],
      },
    ])}
  />
)
