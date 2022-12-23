export const submitData = async (url: string, data: string, method: string, contentType = 'application/json') => {

    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': contentType
        },
        body: data
    })

    if (res.status === 200) {
        return true
    }
    else {
        return false
    }
}

