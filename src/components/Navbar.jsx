import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="flex justify-center space-x-6 text-white">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive 
            ? "font-bold text-yellow-400 underline" 
            : "hover:text-yellow-300"
        }
      >
        Dashboard
      </NavLink>

      <NavLink 
        to="/favorites" 
        className={({ isActive }) => 
          isActive 
            ? "font-bold text-yellow-400 underline" 
            : "hover:text-yellow-300"
        }
      >
        Favorites
      </NavLink>

      <NavLink 
        to="/settings" 
        className={({ isActive }) => 
          isActive 
            ? "font-bold text-yellow-400 underline" 
            : "hover:text-yellow-300"
        }
      >
        Settings
      </NavLink>
    </nav>
  );
}
