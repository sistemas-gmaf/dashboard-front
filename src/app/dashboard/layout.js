'use client'

import SideMenu from '@/components/SideMenu/SideMenu';
import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';
import BackdropLoading from '@/components/Backdrop';
import DevWindow from '@/components/DevWindow';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setAuthorization } from '@/store/slices/user';

export default function RootLayout({ children }) {
  const searchParams = useSearchParams();
  
  const authorizationParam = searchParams.get('authorization');
  const expiresParam = searchParams.get('expires');

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const authorizationAuth = async () => {
      if (process.env.IS_AUTH_BY !== 'authorization') {
        return;
      }
      let authorizationStorage = '';
      if (typeof window !== 'undefined'){
        authorizationStorage = localStorage.getItem('authorization');
      }
      const authorizationToken = authorizationParam || authorizationStorage;

      if (authorizationParam) {
        dispatch(setAuthorization(authorizationParam));
        if (typeof window !== 'undefined') {
          localStorage.setItem('expires', expiresParam);
        }
        router.replace(pathname);
      }
      
      if (!authorizationToken) {
        await Swal.fire({
          icon: 'info',
          text: 'La sesión expiró'
        });
        router.push('/');
      }
    }

    authorizationAuth();
  }, []);

  return (<>
    <Header supressHydrationWarning />
    <SideMenu supressHydrationWarning />
    <SectionContainer supressHydrationWarning>
      {children}
    </SectionContainer>
    <BackdropLoading supressHydrationWarning />
    <DevWindow supressHydrationWarning />
  </>);
}
