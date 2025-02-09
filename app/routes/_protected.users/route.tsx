import React from 'react'
import { useUserContext } from '~/context/user-provider'

function route() {
    const data = useUserContext()

    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}

export default route