
# Weather Dashboard

The Weather Trend App is a sleek, modern React-based weather application that allows users to search for any city and view detailed 5-day forecasts using the OpenWeatherMap API.


## Tech Stack

**Client:** React , TailwindCSS




## Setup Instructions

Install my-project with npm

```bash
  npm install vite-project
  cd vite-project
```
    
## API Integration Details

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `q` | `string` | **Required**. City Name |
| `api_key` | `string` | **Required**. Your API key |

#### API
`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`


## 🔗 Links
[Netlify](https://capable-twilight-23c491.netlify.app/)


