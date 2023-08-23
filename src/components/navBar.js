import { tickers } from '../../tickers'

export default function NavBar ({selectedTickers, currentTicker, setCurrentTicker, setLoading}) {
    return (
      <div className="navbar m-12 w-8/12">
        {selectedTickers.map(ticker => (
          <div 
              key={ticker}
              className={`bubble ${ticker === currentTicker ? 'current' : ''}`}
              onClick={() => {
                  document.getElementById('trendStatement').style.opacity=0;
                  setCurrentTicker(ticker);
                  setLoading(true);
              }}>
              <span className="tooltip">{tickers[ticker]}</span>
          </div>
        ))}
      </div>
    );
}