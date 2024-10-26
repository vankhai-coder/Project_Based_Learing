
// form action : 
export const formAction = async ({ request }) => {
    try {
        const data = await request.formData()
        const submit = {
            p: data.get('p'),
            pmt: data.get('pmt'),
            t: data.get('t'),
            n: data.get('n'),
            r: data.get('r'),
        }
        console.log('submit : ', submit);
        const token = data.get('token')

        // check valid : 
        console.log('method : ', request.method);

        // send post request : 
        const response = await fetch('http://localhost:4000/api/compoundEffects', {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                p: data.get('p'),
                pmt: data.get('pmt'),
                t: data.get('t'),
                n: data.get('n'),
                r: data.get('r')
            }),
        })
        const result = await response.json()
        console.log('result send back: ', result);
        if (!response.ok) {
            return { error: result.error }
        }
        return result

    } catch (error) {
        return { error: error.message }
    }


}