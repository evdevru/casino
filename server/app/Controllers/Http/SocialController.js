'use strict'
const Helpers = use('Helpers')
const User = use('App/Models/User')
const SocialAccount = use('App/Models/SocialAccount')

const Fs = require('fs')
const Path = require('path')

const axios = require('axios')

const { v4: uuidv4 } = require('uuid')

const downloadFile = async (url, downloadFolder = 'images/avatar') => {
  try {
    await axios.get(url, {
      timeout: 2000,
    })
  } catch (e) {
    return
  }

  // Get the file name
  const fileName = `${uuidv4()}.jpg`
  const filePath = Helpers.publicPath(`${downloadFolder}/${fileName}`)

  if (!Fs.existsSync(Helpers.publicPath(downloadFolder))) {
    Fs.mkdirSync(Helpers.publicPath(downloadFolder), { recursive: true })
  }

  // The path of the downloaded file on our machine
  const localFilePath = Path.resolve(filePath)

  const response = await axios
    .get(url, {
      responseType: 'stream',
    })
    .catch(() => {
      return new Promise((resolve, reject) => reject)
    })

  const writer = await response.data.pipe(
    Fs.createWriteStream(localFilePath, { flags: 'a+' })
  )

  return new Promise(function (resolve, reject) {
    writer.on('finish', () => resolve(filePath))
    writer.on('error', reject)
  })
}

class SocialController {
  async handler({ request, auth, response }) {
    const data = request.all()
    let user = null
    try {
      user = await auth.getUser()
    } catch (e) {}
    try {
      user = await this[data.provider](data, user)
      console.log(user)
      const token = await auth.generate(user)
      return response.status(200).send({
        status: 'success',
        message: 'Успешно',
        data: token,
      })
    } catch (e) {
      return response.status(400).send({
        status: 'error',
        message: 'Ошибка! Данная соц. сеть уже использована для аккаунта.',
      })
    }
  }

  async vk(payload, user = null) {
    const profile = await axios.post(
      `https://api.vk.com/method/users.get?user_ids=${payload.user_id}&fields=photo_100,domain&access_token=${payload.access_token}&v=5.130`
    )
    const socials = await SocialAccount.query()
      .where('provider', payload.provider)
      .where('provider_id', payload.user_id)
      .fetch()
    if (socials.toJSON().length) {
      user = await User.find(socials.toJSON()[0].user_id)
      return user
    }
    const data = profile.data.response[0]
    if (!user) {
      const hasUsername = await User.findBy('username', data.domain)
      const hasEmail = await User.findBy('email', payload.email)
      user = await User.create({
        username: hasUsername ? Date.now() : data.domain,
        first_name: data.first_name,
        last_name: data.last_name,
        email: hasEmail ? null : payload.email,
        password: uuidv4(),
      })
    }
    if (user && (!user.first_name || !user.last_name)) {
      user.first_name = data.first_name
      user.last_name = data.last_name
      await user.save()
    }
    if (user && (!user.avatar || !user.avatar.includes('default'))) {
      const avatar = await downloadFile(data.photo_100)
      if (avatar) {
        const filePathServer = avatar.split(Helpers.publicPath())
        user.avatar = filePathServer[filePathServer.length - 1]
        await user.save()
      }
    }
    const social = {
      token: payload.access_token,
      username: data.domain,
      provider: payload.provider,
      provider_id: data.id,
      user_id: user.id,
    }

    await SocialAccount.create(social)

    return user
  }
}

module.exports = SocialController
