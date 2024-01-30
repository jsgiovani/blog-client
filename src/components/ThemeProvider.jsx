import { useSelector } from 'react-redux';

const ThemeProvider = ({children}) => {
    const  {dark}  = useSelector((state) => state.theme);

  return (
    <div className={`${dark &&  "dark"}`}>
        <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
            {children}
        </div>

    </div>
  )
}

export default ThemeProvider