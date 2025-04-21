import { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import { fetchEvents } from '../api/events';

const Home = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    const handleSync = async (date = selectedDate) => {
        setIsSyncing(true);
        try {
            const dateStr = date.toISOString().split('T')[0];
            const data = await fetchEvents(dateStr);
            setEvents(data);
        } catch (error) {
            console.error('Sync failed:', error);
        } finally {
            setIsSyncing(false);
        }
    };


    useEffect(() => {
        handleSync();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Your Calendar Events</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Showing events for {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
                <button
                    onClick={() => handleSync()}
                    disabled={isSyncing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center transition-colors"
                >
                    {isSyncing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Syncing...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Sync Events
                        </>
                    )}
                </button>
            </div>

            <EventList
                events={events}
                selectedDate={selectedDate}
                onDateChange={(date) => {
                    setSelectedDate(date);
                    handleSync(date);
                }}
                isLoading={isSyncing}
            />
        </div>
    );
};

export default Home;



