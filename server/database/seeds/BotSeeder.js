'use strict'

const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const Helpers = use('Helpers')
const { v4: uuidv4 } = require('uuid')
const fakeUsers = require('./trixbar_bots.json').slice(0, 1000)
const User = use('App/Models/User')
const cliProgress = require('cli-progress')
const imagemagick = require('imagemagick')

const downloadFile = async (url, downloadFolder = 'images/avatar') => {
  try {
    await Axios.get(url, {
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

  const response = await Axios.get(url, {
    responseType: 'stream',
  }).catch(() => {
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

/*
|--------------------------------------------------------------------------
| BotSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Env = use('Env')
const UserRole = use('App/Models/UserRole')

class BotSeeder {
  async run() {
    const role = await UserRole.findOrCreate({ name: 'bot' })
    const progress = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    )
    progress.start(1000, 0)

    for await (const user of fakeUsers) {
      const filePath = await downloadFile(user.avatar)

      if (!filePath) {
        progress.increment()
        continue
      }

      await imagemagick.resize({
        srcPath: filePath,
        dstPath: filePath,
        width: 100,
      })

      const filePathServer = filePath.split(Helpers.publicPath())

      // eslint-disable-next-line camelcase
      const { first_name, last_name, username } = user

      try {
        await User.create({
          balance: 5000,
          email: `${uuidv4()}@mail.com`,
          password: Env.get('APP_KEY'),
          first_name,
          last_name,
          username,
          avatar: filePathServer[filePathServer.length - 1],
          role_id: role.toJSON().id,
        })
        progress.increment()
      } catch (e) {}
    }
  }
}

module.exports = BotSeeder
