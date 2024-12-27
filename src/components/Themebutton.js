import React from 'react';
import { useTheme } from '../Theme/ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="p-4 shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Your Notes App</h1>
                <button
                    onClick={toggleTheme}
                    className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
                >
                    {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                </button>
            </div>
        </header>
    );
}

export default Header;
