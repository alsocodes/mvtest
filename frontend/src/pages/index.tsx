import { RouteInterface } from '../components/Sidebar';
import NotfoundPage from './Notfound';

export const getPages = (data: RouteInterface) => {
  const { name } = data;
  // console.log(name);
  let page = null;
  switch (name) {
    default:
      page = <NotfoundPage />;
      break;
  }
  return page;
};
