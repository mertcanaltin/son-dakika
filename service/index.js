async function fetchTime() {
    const res = await fetch(`https://api.afetharita.com/tweets/locations?format=json`)
    const data = await res.json()
  
    return data
  }

  export { fetchTime }