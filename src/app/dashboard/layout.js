import SideMenu from '@/components/SideMenu';
import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';
import BackdropLoading from '@/components/Backdrop';

export default function RootLayout({ children }) {
  return (<>
    <Header />
    <SideMenu />
    <SectionContainer>
      {children}
    </SectionContainer>
    <BackdropLoading />
  </>);
}
