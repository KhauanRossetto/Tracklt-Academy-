import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Topo() {
  const { user } = useContext(AuthContext);

  return (
    <Header>
      <h2>TrackIt</h2>
      <img src={user?.image} alt="User" />
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #126ba5;
  color: white;
`;