import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AppBar, Toolbar, IconButton, Typography, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TodayIcon from "@mui/icons-material/Today";

function Menu() {
  const { user } = useContext(UserContext);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="flex justify-between">
          <Typography variant="h6">Meu App</Typography>
          {user && (
            <Avatar alt={user.name} src={user.image} />
          )}
        </Toolbar>
      </AppBar>

      <nav className="bg-gray-800 p-4 text-white fixed bottom-0 w-full">
        <ul className="flex justify-around">
          <li>
            <Link to="/" className="hover:text-blue-400 flex items-center">
              <IconButton color="inherit">
                <HomeIcon />
              </IconButton>
              Início
            </Link>
          </li>
          <li>
            <Link to="/habitos" className="hover:text-blue-400 flex items-center">
              <IconButton color="inherit">
                <ListAltIcon />
              </IconButton>
              Hábitos
            </Link>
          </li>
          <li>
            <Link to="/hoje" className="hover:text-blue-400 flex items-center">
              <IconButton color="inherit">
                <TodayIcon />
              </IconButton>
              Hoje
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Menu;
