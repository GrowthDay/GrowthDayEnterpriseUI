const { Octokit } = require('@octokit/rest')
const https = require('https')
const path = require('path')
const Downloader = require('nodejs-file-downloader')
const extract = require('extract-zip')
const rimraf = require('rimraf')
const ora = require('ora')
const octokit = new Octokit({
  auth: process.env.GH_TOKEN
})

const download = async () => {
  const spinner = ora('Downloading Typings...').start()
  const artifacts = await octokit.rest.actions.listArtifactsForRepo({
    owner: 'GrowthDay',
    repo: 'GrowthDayStrapi'
  })
  const artifact_id = artifacts.data.artifacts[0]?.id
  if (artifact_id) {
    const response = await octokit.rest.actions.downloadArtifact({
      owner: 'GrowthDay',
      repo: 'GrowthDayStrapi',
      artifact_id,
      archive_format: 'zip'
    })
    const downloader = new Downloader({
      url: response.url,
      directory: './',
      httpsAgent: https,
      fileName: 'types.zip',
      cloneFiles: false
    })
    await downloader.download()
    const outputPath = path.resolve('src', 'types', 'strapi')
    rimraf.sync(outputPath)
    spinner.succeed()
    spinner.start('Extracting...')
    await extract('types.zip', { dir: outputPath })
    rimraf.sync('types.zip')
  }
  spinner.succeed()
}

download()
