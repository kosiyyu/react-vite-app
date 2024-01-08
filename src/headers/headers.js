export const multipartFormData = {
    "headers": {
        "Content-Type": "multipart/form-data"
    }
}

export const applicationJson = {
    "headers": {
        "Content-Type": "application/json"
    }
}

export const octetStream = {
    "headers": {
        "Accept": "application/octet-stream"
    },
    responseType: "arraybuffer"
}

export const applicationJsonCors = {
    "headers": {
        "Content-Type": "application",
        "Access-Control-Allow-Origin": "*"
    }
}
