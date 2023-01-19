import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoLogOutOutline } from 'react-icons/io5';
import { IconType } from 'react-icons';
import { selectConfig, useAppSelector } from '../../app/hooks';

type Props = {
  children: JSX.Element;
};

export interface RouteInterface {
  name: string;
  title?: string;
  type?: string;
  label?: string;
  element?: any;
  path: string;
  icon?: IconType;
  childs?: RouteInterface[];
}

export const routes: RouteInterface[] = [
  {
    name: 'HOME',
    title: '',
    label: '',
    path: '/home',
    icon: IoHomeOutline,
  },
  {
    name: 'USER',
    title: '',
    label: 'User',
    path: '/user',
  },
  {
    name: 'CHANGE PASSWORD',
    title: '',
    label: 'Change Password',
    path: '/change-password',
  },
  {
    name: 'POST',
    title: '',
    label: 'Post',
    path: '/post',
  },
];

const SidebarItem = ({ active, route, hideLabel }: any) => {
  const { name, type, label, icon: Icon, path } = route;
  const isActive = active === name ? 'active' : '';

  if (type === 'label') {
    return (
      <li className='my-px' key={name}>
        <span className={`flex font-medium text-sm px-4 my-1 rounded-lg`}>
          {hideLabel ? '...' : label}
        </span>
      </li>
    );
  }
  return (
    <li className='my-px' key={name}>
      <Link
        to={path}
        className={`cursor-pointer flex justify-center items-center h-10 px-3 rounded-lg my-2 ${isActive}`}
      >
        {Icon && <Icon fontSize={24} />}
        <span className={`${hideLabel && 'hidden'}`}>{label}</span>
      </Link>
    </li>
  );
};

const Sidebar = ({ children }: Props) => {
  const { menuActive } = useAppSelector(selectConfig);

  return (
    <div className='flex min-h-screen bg-base-100 text-base-content w-full'>
      <aside
        className={`
          flex-shrink-0
          w-44 md:w-60 bg-base-300 sidebar transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className='sidebar-content px-4 py-2 h-full flex flex-col justify-between'>
          <ul className='menu flex flex-col w-full'>
            {routes.map((route, i) => {
              return (
                <SidebarItem
                  hideLabel={false}
                  active={menuActive}
                  key={`s-${i}`}
                  route={route}
                />
              );
            })}
          </ul>
          <button className={`btn btn-ghost w-full rounded-lg`}>
            <IoLogOutOutline />
            <span className='ml-3'>Logout</span>
          </button>
        </div>
      </aside>
      {/* flexx flex-colx */}
      <main className='main flex-grow transition-all duration-150 ease-in'>
        <div className='main-content px-8 py-8 border h-full'>{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
