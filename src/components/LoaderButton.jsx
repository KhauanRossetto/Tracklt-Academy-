import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function LoaderButton(props) {

    return (
        <StyledButton disabled={props.loading} data-test={props.testStr} $loading={props.loading} >
            <div>{props.children}</div>
            <ThreeDots
            height={24} 
            width={64}
            color="#FFFFFF"
            />
        </StyledButton>
    )
}

const StyledButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;

    div:first-child {
        color: #FFFFFF;
        display: ${ (props) => props.$loading ? "none" : "block"}
    }
    
    svg {
        display: ${ (props) => props.$loading ? "block" : "none"}
    }
`