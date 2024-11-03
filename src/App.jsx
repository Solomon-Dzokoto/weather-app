import { useState,useEffect,useRef } from "react"
import { IoSearchSharp } from "react-icons/io5";


function App() {
 const [city,setCity]=useState('')
//  const [value,setValue]=useState('')
 const [collector,setCollector]=useState(null)
      const InputRef=useRef(null)

    useEffect(()=> {
       let timeOut;
      const fetchData = async () => {
        const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
      
        try{
          const response= await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
          const data = await response.json();
          console.log(data)
          setCollector(data)
        }catch(error){
          console.error(`${error} this is critical`)
        }
      }
      if(collector){
        InputRef.current.focus()
      }
      timeOut=setTimeout(()=>{
        fetchData()
      },100)
       return ()=>clearTimeout(timeOut)
      }  ,[city])
  const dateObj=new Date;
  const month =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October', 
    'November',
    'December',
  ]
  const date=`${month[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}    ${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2,'0')}`

  return (
    <main>
      <h1>Weather Forecast</h1>
      <form onSubmit={ e => e.preventDefault()}>
      <input 
      type="text"
      placeholder="Enter Your City"
      ref={InputRef}
      value={city}
      onChange={e=>setCity(e.target.value)}
      />
      <br/>
      <span className="icon">⛈</span> 
      <button 
      type="submit"
      >
          <IoSearchSharp />
      </button>
      </form>
        {collector&&collector.current&&collector.location?(
           <div className="weather__details">
          <h1>{collector.location.country}</h1>
          <h2>{collector.location.name}</h2>
          <div className="temp">
          <span>{collector.current.temp_c}°</span>
          <span>{collector.current.temp_f}°F</span>
          </div>
          <div className="time">
          {date}
          </div>
           </div>
          ):(<h3>Cant Find any place</h3>)}

    </main>
  )
}

export default App
