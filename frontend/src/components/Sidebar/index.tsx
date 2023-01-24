import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoLogOutOutline, IoMenuOutline } from 'react-icons/io5';
import { IconType } from 'react-icons';
import { selectConfig, useAppDispatch, useAppSelector } from '../../app/hooks';
import { Logout } from '../../slices/AuthSlice';

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
    path: '/',
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
        className={`cursor-pointer flex justify-center h-10 px-3 rounded-lg my-2 ${isActive}`}
      >
        {Icon && <Icon fontSize={24} />}
        {label && <span className={`${hideLabel && 'hidden'}`}>{label}</span>}
      </Link>
    </li>
  );
};

const Sidebar = ({ children }: Props) => {
  const { menuActive } = useAppSelector(selectConfig);
  const dispatch = useAppDispatch();
  const OnLogoutPress = () => {
    dispatch(Logout());
  };

  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setToggle(false);
  }, [menuActive]);

  return (
    <div className='flex h-full border bg-base-100 text-base-content w-full relative'>
      <div
        onClick={() => setToggle(false)}
        className={`fixed top-0 right-0 left-0 bottom-0
         bg-black bg-opacity-50 z-10
         transition-all
         duration-300
         ${!toggle && 'hidden'}
         `}
      />
      <aside
        className={`
          absolute top-0 bottom-0 ${toggle ? 'left-0' : '-left-full'}
          z-20
          md:static
          flex-shrink-0
          w-60 bg-base-300 sidebar transition-all duration-300 ease-in-out overflow-hidden`}
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
          <button
            className={`btn btn-ghost w-full rounded-lg`}
            onClick={() => OnLogoutPress()}
          >
            <IoLogOutOutline />
            <span className='ml-3'>Logout</span>
          </button>
        </div>
      </aside>
      {/* flexx flex-colx */}
      <main className='main flex-grow transition-all duration-150 ease-in'>
        <div className='h-full flex flex-col pb-2 md:pb-0'>
          <button
            className={`btn btn-circle btn-ghost  md:hidden`}
            onClick={() => setToggle(true)}
          >
            <IoMenuOutline size={24} />
          </button>
          {/* <div className='main-content px-12 py-6 border h-full'>{children}</div> */}
          <div className='main-content px-4 p4-6 md:px-12 md:py-12 h-full'>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
