import DatepickerProvider from '@/components/DatepickerProvider';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import StoreProvider from '@/store/provider';

export const metadata = {
  title: 'Dashboard Grupo MAF',
  description: 'Aplicacion de gestion Grupo MAF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          <ThemeRegistry>
            <DatepickerProvider>
              {children}
            </DatepickerProvider>
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
