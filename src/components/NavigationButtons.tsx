type NavigationButtonsProps = {
  handleNextCity: () => void
  handlePreviousCity: () => void
}

export default function NavigationButtons({
  handleNextCity,
  handlePreviousCity,
}: NavigationButtonsProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 40px',
        boxSizing: 'border-box',
        zIndex: 10,
      }}
    >
      <button
        style={{
          cursor: 'pointer',
          fontSize: '32px',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          transition: 'transform 0.2s',
        }}
        onClick={handlePreviousCity}
      >
        &#8592;
      </button>
      <button
        style={{
          cursor: 'pointer',
          fontSize: '32px',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          transition: 'transform 0.2s',
        }}
        onClick={handleNextCity}
      >
        &#8594;
      </button>
    </div>
  )
} 