import styled from 'styled-components'
const StyledText = styled.p`
  font-family: 'Nabla', sans-serif;
`
function LogoTest() {
    return (
        <div>
            <svg height="100">
                <text x="10" y="50" fill="black" fontFamily="'Nabla', sans-serif" fontSize="35">
                    SciJourDex
                </text>
            </svg>
        </div>
    );
}

export default LogoTest;
