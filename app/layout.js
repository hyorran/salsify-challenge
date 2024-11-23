import './globals.scss'

export const metadata = {
  title: 'Salsify Challenge',
  description: ''
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
    {children}
    </body>
    </html>
  );
}
