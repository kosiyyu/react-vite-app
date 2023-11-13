import styled from 'styled-components'
const StyledText = styled.p`
  font-family: 'Nabla', sans-serif;
`
function LogoTest() {
    return (
        <div>
            <svg width="100" height="100">
                <text x="10" y="50" fill="black" fontFamily="'Nabla', sans-serif" fontSize="35">
                    QMJ
                </text>
            </svg>
        </div>
    );
}

export default LogoTest;
