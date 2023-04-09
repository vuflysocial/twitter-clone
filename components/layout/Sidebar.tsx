import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import SidebarItem from './SidebarItem';
import placeholderLogo from './images/placeholder.png';
import SidebarClawButton from './SidebarClawButton';

type SidebarItem = {
  label: string;
  href: string;
  auth?: boolean;
  alert?: boolean;
};

const Sidebar = (): JSX.Element => {
  const { data: currentUser } = useCurrentUser();

  const items: SidebarItem[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <div>
            <img src={placeholderLogo.src} alt="Placeholder logo" width={40} height={40} style={{ marginTop: '10px' }} />
          </div>
          {items.map((item: SidebarItem) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              label={item.label}
            />
          ))}
          {currentUser && (
            <SidebarItem onClick={() => signOut()} label="Logout" />
          )}
          <SidebarClawButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
