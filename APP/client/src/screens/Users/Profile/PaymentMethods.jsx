import React from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';

export default function PaymentMethods() {
  return (
    <div className="App">
            <UsersNavbar />
            <AccountSidebar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Payment Methods</h3>
                            
                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
  )
}
