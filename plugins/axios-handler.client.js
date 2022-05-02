export default function ({ $axios, $notify }) {
  $axios.onResponse((response) => {
    if (response && response.data) {
      const { status, message } = response.data
      if (status && message)
        $notify(
          {
            text: message,
            type: status,
            group: 'default',
          },
          4000
        )
    }
  })
  $axios.onError((error) => {
    let message = null
    // validation errors in error.response.data
    if (error.response?.data?.message) {
      $notify(
        {
          text: error.response.data.message,
          type: 'error',
          group: 'default',
        },
        4000
      )
    }

    if (
      error.response &&
      !error.response?.data?.message &&
      Array.isArray(error.response.data)
    ) {
      error.response.data.forEach((err) => {
        $notify(
          {
            text: err.message,
            type: 'error',
            group: 'default',
          },
          4000
        )
      })
    }

    const code = error.response?.status

    switch (code) {
      case 401:
        message = 'Вы не авторизованы!'
        break
    }

    if (message) {
      $notify(
        {
          text: message,
          type: 'error',
          group: 'default',
        },
        4000
      )
    }

    return true
  })
}
