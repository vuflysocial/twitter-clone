import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import SidebarItem from './SidebarItem';
import placeholder from './images/placeholder.png';
import SidebarClawButton from './SidebarClawButton';

type SidebarItem = {
  icon: string; // Change type to string to accommodate image sources
  label: string;
  href: string;
  auth?: boolean;
  alert?: boolean;
};

const Sidebar = (): JSX.Element => {
  const { data: currentUser } = useCurrentUser();

  const items: SidebarItem[] = [
    {
      icon: '/path/to/home-icon.png', // Replace with actual image source
      label: 'Home',
      href: '/',
    },
    {
      icon: '/path/to/notifications-icon.png', // Replace with actual image source
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: '/path/to/profile-icon.png', // Replace with actual image source
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
        <img src={placeholder.src} alt="Placeholder logo" width={40} height={40} style={{marginTop: '10px'}} />
        </div>
          {items.map((item: SidebarItem) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={<img src={item.icon} alt={item.label} width={20} height={20} />} // Render image element
              label={item.label}
            />
          ))}
          {currentUser && (
            <SidebarItem onClick={() => signOut()} icon={<img src="/path/to/logout-icon.png" alt="Logout" width={20} height={20} />} label="Logout" /> // Replace with actual image source
          )}
          <SidebarClawButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
