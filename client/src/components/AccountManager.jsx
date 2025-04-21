import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../api/messageHandling';

const AccountManager = ({ setIsAuthenticated }) => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('auth_token');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/users/accounts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAccounts(response.data);
            console.log('see response of fetch accouts', response.data)
        } catch (error) {
            console.error('Error fetching accounts:', error);
            showErrorToast(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAccount = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    };

    const handleRemoveAccount = async (accountId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this account?");

        if (!confirmDelete) return;
        try {

            const response = await axios.delete(`http://localhost:5000/api/users/accounts/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showSuccessToast("Account removed successfully");
            if (accounts.length === 1) {
                localStorage.removeItem('auth_token');
                setIsAuthenticated(false);
                setTimeout(() => {
                    navigate('/');
                }, 500);
            } else {
                fetchAccounts();
            }
        } catch (error) {
            console.error('Error removing account:', error);
        }
    };


    if (loading) return <div>Loading accounts...</div>;

    return (
        <div>
            <h2 className="mx-1 px-1 text-2xl font-bold text-gray-800 mb-6">Connected Accounts</h2>

            <button
                onClick={handleAddAccount}
                className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                </svg>
                Add Google Account
            </button>

            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <ul className="space-y-3">
                    {accounts.map(account => (
                        <li key={account._id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                            <span className="font-medium">{account.email}</span>
                            <button
                                onClick={() => handleRemoveAccount(account._id)}
                                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AccountManager;
