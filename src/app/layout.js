import './globals.css'
import AOSInit from '@/utils/aos'
import ScrollToTop from '@/utils/ScrollToTop'


export const metadata = {
  title: 'صفحه  ی اصلی - SET Coffee | فروشگاه اینترنتی قهوه',
  description: 'Coffee project with NextJs v13',
  icons: {
    icon: "/images/coffee-logo.png"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        <AOSInit />
        {children}
        <ScrollToTop />
      </body>
    </html>
  )
}
