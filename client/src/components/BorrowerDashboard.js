// client/src/components/BorrowerDashboard.js
import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';
import Invoices from './Invoices';
import api from '../api/axios';

const BorrowerDashboard = () => {
    const firstName = localStorage.getItem('firstName');
    const [showInvoiceForm, setShowInvoiceForm] = useState(false);
    const [showInvoices, setShowInvoices] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [showUserDetails, setShowUserDetails] = useState(false);

    const handleProfileClick = async () => {
        const email = localStorage.getItem('email');
        if (!email) {
            console.error('Email not found in local storage');
            return;
        }

        try {
            const response = await api.get(`/api/borrowers/profile?email=${email}`);
            const { firstName, lastName, phone, email: userEmail, borrowerId } = response.data;
            console.log(firstName, lastName, phone, userEmail, borrowerId);
            setUserDetails({ firstName, lastName, phone, userEmail, borrowerId });
            setShowUserDetails(true);
            setShowInvoiceForm(false);
            setShowInvoices(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto">
                <div className='bg-black text-white text-center py-4'>Hi {firstName}, Welcome to borrower dashboard</div>
                
                <div className='flex flex-row'>
                    {/* ye menu bar hai*/}
                    <div className='flex flex-col bg-slate-300 w-[16rem] h-[86vh] shadow-lg'>

                    <div className='border-t-2 border-gray-400'></div>

                        <button onClick={() => {
                            setShowInvoices(false);
                            setShowInvoiceForm(true);
                            setShowUserDetails(false);
                        }} className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Upload invoice
                            </button>

                            <div className='border-t-2 border-gray-400'></div>

                            <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                                Home
                                </button>

                                <button onClick={handleProfileClick} className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                                Profile
                                </button>

                            <div className='border-t-2 border-gray-400'></div>

                        <button onClick={() => {
                            setShowInvoiceForm(false);
                            setShowInvoices(true);
                            setShowUserDetails(false);
                            }} className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                                My invoices
                                </button>

                        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Dummy
                            </button>

                            <div className='border-t-2 border-gray-400'></div>

                            <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Dummy
                            </button>
                            <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Dummy
                            </button>
                    </div>

                {/* ye form ka area hai*/}
                <div >
                    {showInvoiceForm && <div>
                      <InvoiceForm />
                    </div>}
                </div>

                <div >
                    {showInvoices && <div>
                      <Invoices />
                    </div>}
                </div>

                {showUserDetails && userDetails && (
                        <div className="mt-5">
                            <h2 className="text-2xl font-bold">User Details</h2>
                            <p><strong>First Name:</strong> {userDetails.firstName}</p>
                            <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                            <p><strong>Email:</strong> {userDetails.userEmail}</p>
                            <p><strong>Phone:</strong> {userDetails.phone}</p>
                            <p><strong>Borrower ID:</strong> {userDetails.borrowerId}</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default BorrowerDashboard;
