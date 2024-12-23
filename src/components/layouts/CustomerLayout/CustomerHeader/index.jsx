import SearchForm from '@/components/forms/SearchForm';
import { Button } from '@/components/shadcnUI/button';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import HeaderActions from './HeaderActions';
import BookCategory from './BookCategory';

const CustomerHeader = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const handleSearchBooks = (value) => {
    const search = value.searchText;
    navigate(`/tim-kiem/${search}`);
  };
  return (
    <div className='fixed left-0 top-0 z-50 w-full border-b bg-[#FAFAFA] py-5'>
      <header className='container mx-auto flex items-center'>
        <Link to='/'>
          <img src='/images/brand-logo.png' alt='BookStore' className='h-8' />
        </Link>
        <BookCategory />
        <div className='w-2/5'>
          <SearchForm onSubmit={handleSearchBooks} />
        </div>
        <div className='ml-auto'>
          {!accessToken ? (
            <Button asChild>
              <Link to='/login'>Đăng nhập</Link>
            </Button>
          ) : (
            <HeaderActions />
          )}
        </div>
      </header>
    </div>
  );
};
export default CustomerHeader;
