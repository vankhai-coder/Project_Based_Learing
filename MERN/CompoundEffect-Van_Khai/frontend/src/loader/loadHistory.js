
export const loadHistory = async () => {
    const response = await fetch('http://localhost:4000/api/compoundEffects')
    const data = await response.json()
    console.log('Load history!');
        
    if(!response.ok){
        throw new Error(data.error)
    }
    return data
}