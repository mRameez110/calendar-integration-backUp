import { useState } from 'react';
import { showErrorToast } from '../api/messageHandling'; // Import the showErrorToast function

const AuthButton = ({ setIsAuthenticated }) => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isBasicAuthComplete, setIsBasicAuthComplete] = useState(false);

    // Function to handle basic authentication (username & password)
    const handleBasicAuth = () => {
        // Placeholder for basic auth logic (replace with your auth API)
        if (username === 'user' && password === '12') { // Example condition
            setIsBasicAuthComplete(true);
            setShowModal(false); // Close the modal after successful basic auth
            // Continue with Google auth after basic auth is completed
            handleGoogleAuth();
        } else {
            showErrorToast("Invalid username or password."); // Call the error toast here
        }
    };

    // Function to start Google authentication
    const handleGoogleAuth = () => {
        window.location.href = import.meta.env.VITE_AUTH_URL;
    };

    return (
        <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-2xl shadow text-center mt-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18A2.69 2.69 0 0 0 5 16.5c-.91-.62.07-.6.07-.6a2.1 2.1 0 0 1 1.53 1 2.15 2.15 0 0 0 2.91.83 2.16 2.16 0 0 1 .63-1.34C8 16.17 5.62 15.31 5.62 11.5a3.87 3.87 0 0 1 1-2.71 3.58 3.58 0 0 1 .1-2.64s.84-.27 2.75 1a9.63 9.63 0 0 1 5 0c1.91-1.29 2.75-1 2.75-1a3.58 3.58 0 0 1 .1 2.64 3.87 3.87 0 0 1 1 2.71c0 3.82-2.34 4.66-4.57 4.91a2.39 2.39 0 0 1 .69 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Connect Your Google Calendar</h2>

            {/* Basic Auth Button to open the modal */}
            <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
            >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                Continue with Google
            </button>

            {/* Modal for Basic Authentication */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Complete Basic Authentication</h3>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            onClick={handleBasicAuth}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 text-sm text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthButton;
