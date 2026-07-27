import { cookies } from 'next/headers';
import ClientLayout from './ClientLayout';
import AdminLogin from './AdminLogin';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const wasLoggedIn = cookieStore.get('was_logged_in');

  if (!session || session.value !== 'authenticated') {
    const isExpired = wasLoggedIn && wasLoggedIn.value === 'true';
    return <AdminLogin sessionExpired={isExpired} />;
  }

  return <ClientLayout>{children}</ClientLayout>;
}
