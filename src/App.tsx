import Options from "./components/Options";
import PlayerList from "./components/PlayerList";

function App() {
	return <div style={{
		display: "flex",
		flexDirection: "column",
		height: "100%",
	}}>
		<Options/>
		<PlayerList/>
	</div>;
}

export default App;
