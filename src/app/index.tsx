/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { GlobalStyle } from 'styles/global-styles'

import { HomePage } from './pages/HomePage/Loadable'
import { I18nextProvider } from 'react-i18next'
import i18n from 'locales/i18n'
import { ConfigProvider, theme } from 'antd'
import { NotFoundPage } from './components/NotFoundPage'

declare global {
  interface Window {
    nostr: {
      enabled: boolean
      getPublicKey: () => string
      signEvent: (event: Event) => Promise<Event>
    }
  }
}

export const App: () => JSX.Element = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#F7931A',
          colorBgContainer: '#4D4D4D',
          colorSuccess: '#00b96b',
          colorError: '#F71735',
          colorInfo: '#3772FF',
          colorLink: '#FEB95F'
        },
      }}
    >
          <BrowserRouter>
            <Helmet
              titleTemplate='%s - Satstralia'
              defaultTitle='Satstralia'
              htmlAttributes={{ lang: i18n.language }}
            >
              <meta name='description' content='Satstralia' />
            </Helmet>
            <I18nextProvider i18n={i18n}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </I18nextProvider>
            <GlobalStyle />
          </BrowserRouter>
    </ConfigProvider>
  )
}
