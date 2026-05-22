const RANK_COLOR = ["gold", "silver", "#cd7f32"];

const tableStyle = {
  color: "white",
  fontSize: "25px",
  margin: "0 auto",
  borderCollapse: "collapse",
  border: "2px solid white",
  fontFamily: "YOnepickTTF-Bold",
};

const cellBase = {
  padding: "8px",
  textAlign: "center",
  border: "1px solid white",
  fontWeight: "bold",
};

const headerCell = (width) => ({
  width,
  padding: "8px",
  border: "1px solid white",
});

const RankingTable = ({ ranking }) => (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={headerCell("150px")}>순위</th>
        <th style={headerCell("350px")}>닉네임</th>
        <th style={headerCell("400px")}>기록</th>
      </tr>
    </thead>
    <tbody>
      {ranking.map((r, i) => (
        <tr key={r.rank} style={{ color: RANK_COLOR[i] ?? "white" }}>
          <td style={cellBase}>{r.rank}</td>
          <td style={cellBase}>{r.nickname}</td>
          <td style={cellBase}>{r.score.toFixed(4)}초</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RankingTable;
