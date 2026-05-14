const Particles = ({ particles }) => (
  <>
    {particles.map((p) => (
      <div
        key={p.id}
        style={{
          position: "absolute",
          left: `${p.x}px`,
          top: `${p.y + p.lifetime * 100}px`,
          opacity: 1 - p.lifetime,
          color: "black",
          fontSize: "24px",
          pointerEvents: "none",
          zIndex: 25,
        }}
      >
        🌟
      </div>
    ))}
  </>
);

export default Particles;
