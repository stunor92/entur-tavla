import { formatNumber, convertSymbolKeyToId } from '../ts/main';

export default function Weather({ weather }) {
  const temperature = weather.data.instant.details.air_temperature;
  const isPositive = temperature > 0;
  const symbolCode = weather.data.next_1_hours.summary.symbol_code;
  const weatherIconId = convertSymbolKeyToId(symbolCode);

  return (
    <div className="box">
      <div className="header">
        {weather.time.substring(11, 16)}
      </div>
      <div>
        <img
          src={`/weathericons/${weatherIconId}.svg`}
          alt=""
          className="weather-icon"
        />
        <div className="black">
          <div className="flex">
            <img src="/thermometer.svg" className="icon" />
            <div className={isPositive ? "red" : "blue"}>
              {formatNumber(temperature, 'celsius')}
            </div>
          </div>
          <div className="flex black">
            <img src="/umbrella.svg" className="icon" />
            {formatNumber(weather.data.next_1_hours.details.precipitation_amount, 'millimeter')}
          </div>
          <div className="flex black">
            <img src="/wind.svg" className="icon" />
            {formatNumber(weather.data.instant.details.wind_speed, 'meter-per-second')}
          </div>
        </div>
      </div>
    </div>
  );
}
