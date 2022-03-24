const { Octokit } = require('@octokit/rest')
const https = require('https')
const path = require('path')
const Downloader = require('nodejs-file-downloader')
const extract = require('extract-zip')
const rimraf = require('rimraf')
const ora = require('ora')
const { execSync } = require('child_process')
const octokit = new Octokit({
  auth: process.env.GH_TOKEN
})

const downloadStrapiTypings = async () => {
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
      fileName: 'types-strapi.zip',
      cloneFiles: false
    })
    await downloader.download()
    const outputPath = path.resolve('src', 'types', 'strapi')
    rimraf.sync(outputPath)
    spinner.succeed()
    spinner.start('Extracting...')
    await extract('types-strapi.zip', { dir: outputPath })
    rimraf.sync('types-strapi.zip')
  }
  spinner.succeed()
}

const downloadApiTypings = async () => {
  const spinner = ora('Downloading Typings...').start()
  const artifacts = await octokit.rest.actions.listArtifactsForRepo({
    owner: 'GrowthDay',
    repo: 'GrowthDayAPI'
  })
  const artifact_id = artifacts.data.artifacts[0]?.id
  if (artifact_id) {
    const response = await octokit.rest.actions.downloadArtifact({
      owner: 'GrowthDay',
      repo: 'GrowthDayAPI',
      artifact_id,
      archive_format: 'zip'
    })
    const downloader = new Downloader({
      url: response.url,
      directory: './',
      httpsAgent: https,
      fileName: 'types-api.zip',
      cloneFiles: false
    })
    await downloader.download()
    const outputPath = path.resolve('src', 'types', 'api')
    rimraf.sync(outputPath)
    spinner.succeed()
    spinner.start('Extracting...')
    await extract('types-api.zip', { dir: outputPath })
    rimraf.sync('types-api.zip')
  }
  spinner.succeed()
}

const download = async () => {
  await downloadStrapiTypings()
  await downloadApiTypings()
  const spinner = ora('Formatting...').start()
  execSync('prettier --write "src/types/{strapi,api}/**/*.{js,jsx,ts,tsx}"', { stdio: 'inherit' })
  spinner.succeed()
}

download()
