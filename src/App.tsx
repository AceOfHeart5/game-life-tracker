function App() {
	return <div style={{
		display: "flex",
		flexDirection: "column",
		minHeight: "200px",
	}}>
		<div style={{
			backgroundColor: "#f44",
			flexGrow: 1,
		}}>Top</div>
		<div style={{
			backgroundColor: "#44f",
			flexGrow: 1,
		}}>Bottom</div>
	</div>;
}

export default App;
