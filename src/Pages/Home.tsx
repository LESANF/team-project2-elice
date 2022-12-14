import styled from 'styled-components';

const TestDiv = styled.div`
	width: 300px;
	height: 300px;
	background-color: ${({ theme }) => theme.bgColor};
`;

function Home() {
	return (
		<>
			<h1>Photolog Home</h1>
			<TestDiv />
		</>
	);
}

export default Home;
