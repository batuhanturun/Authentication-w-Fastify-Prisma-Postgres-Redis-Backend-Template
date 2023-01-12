import React from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';

export default function Services() {
  return (
    <div className="App">
            <UsersNavbar />
            <AccountSidebar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Services</h3>
                            
                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
  )
}
