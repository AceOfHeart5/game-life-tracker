import PlayerList from "./components/PlayerList";

function App() {
	return <div style={{
		display: "flex",
		flexDirection: "column",
		minHeight: "200px",
	}}>
		<PlayerList/>
	</div>;
}

export default App;
