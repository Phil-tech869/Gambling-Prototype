import { useState } from "react";

export default function App() {
  const [game, setGame] = useState("none");
  const [bet, setBet] = useState("");
  const [result, setResult] = useState("");
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);

  const play = () => {
    const pot = parseFloat(bet) * 2;
    const rake = pot * 0.1;
    let winner, payload;

    if (game === "dice") {
      const r1 = Math.ceil(Math.random() * 6);
      const r2 = Math.ceil(Math.random() * 6);
      setP1(r1); setP2(r2);
      winner = r1 === r2 ? "Draw" : r1 > r2 ? "Player 1" : "Player 2";
    } else {
      const flip = Math.random() < 0.5 ? "Heads" : "Tails";
      setP1(flip); setP2("Tails");
      winner = flip === "Heads" ? "Player 1" : "Player 2";
    }

    payload = `⚖️ ${winner} wins! Pot: ${pot} ETH · Rake: ${rake} ETH · Payout: ${pot - rake} ETH`;
    setResult(payload);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4 text-center">
      <h1 className="text-2xl font-bold">Crypto Gambling Prototype</h1>
      <select onChange={(e) => setGame(e.target.value)} className="w-full p-2 border">
        <option value="none">Select Game</option>
        <option value="dice">Dice Duel</option>
        <option value="coin">Coin Flip</option>
      </select>
      <input
        type="number"
        placeholder="Bet (ETH)"
        className="w-full p-2 border"
        value={bet}
        onChange={(e) => setBet(e.target.value)}
      />
      <button
        disabled={game === "none" || !bet}
        onClick={play}
        className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        Play
      </button>
      {result && (
        <div className="p-4 border rounded space-y-2">
          <p>{result}</p>
          {game === "dice" && <p>Rolls: {p1} vs {p2}</p>}
          {game === "coin" && <p>Flip result: {p1}</p>}
        </div>
      )}
    </div>
  );
}