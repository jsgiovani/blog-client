import { Avatar, Button, Dropdown, DropdownDivider, DropdownItem, Navbar, TextInput } from 'flowbite-react';

import { IoIosSearch } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {

    const {pathname} = useLocation();
    const { currentUser} = useSelector((state) => state.user);
    console.log(currentUser);

  return (

    <Navbar className='border-b-2 text-sm md:text-xl'>
        <Link to="/" className='flex gap-1 font-semibold items-end'>
            <h1>Blog</h1>
        </Link>

        <form>
            <TextInput
                type='text'
                placeholder='Search'
                rightIcon={IoIosSearch}
                className='hidden lg:inline'

            />
        </form>



        <Button
            className='w-12 h-10 lg:hidden'
            color='gray'
            pill
        >
            <IoIosSearch/>
        </Button>

        <div className='flex gap-2 items-center'>

            <Button
                className='w-12 h-10  hidden md:inline'
                color='gray'
                pill
            >
                <FaMoon />
            </Button>

            {currentUser && currentUser.email ? (
                <Dropdown
                    arrowIcon = {false}
                    inline
                    label = {
                        <Avatar
                            alt='User'
                            img={currentUser.photo}
                            rounded
                        />
                    }
                >

                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-semibold truncate'>{currentUser.email}</span>
                    </Dropdown.Header>

                    <Link to={'/dashboard?tab=profile'}>
                        <DropdownItem>Profile</DropdownItem>
                    </Link>

                    <DropdownDivider/>

                    <Link to={'/logout'}>
                        <DropdownItem>Logout</DropdownItem>
                    </Link>

                </Dropdown>
                ):(
                <Link to="/register">
                
    
                    <Button
                        outline
                        className='hidden md:inline overflow-hidden'
                        gradientDuoTone={'purpleToBlue'}
                        color='gray'
                    >
                        Register
                    </Button>
    
                </Link>
                    
                )}
    
                <Navbar.Toggle/>

        </div>

        <Navbar.Collapse>
            <Navbar.Link active = {pathname == '/'} as={'div'} >
                <Link to="/">Home</Link>
            </Navbar.Link>

            <Navbar.Link active = {pathname == '/about'} as={'div'} >
                <Link to="/about">About</Link>
            </Navbar.Link>

            <Navbar.Link active = {pathname == '/projects'} as={'div'} >
                <Link to="/projects">Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
    
   
  )
}

export default Header