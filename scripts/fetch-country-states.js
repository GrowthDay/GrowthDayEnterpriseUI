// Source: https://github.com/dr5hn/countries-states-cities-database
const fs = require('fs-extra')
const path = require('path')
const lodash = require('lodash')
const rimraf = require('rimraf')

const { Octokit } = require('@octokit/rest')
const https = require('https')
const Downloader = require('nodejs-file-downloader')
const extract = require('extract-zip')
const ora = require('ora')
const { isSupportedCountry } = require('react-phone-number-input')
const octokit = new Octokit({
  auth: process.env.GH_TOKEN
})

const download = async () => {
  const branch = 'master'
  const fileName = 'repo-country.zip'
  const spinner = ora('Downloading Repository...').start()
  const response = await octokit.rest.repos.downloadZipballArchive({
    owner: 'dr5hn',
    repo: 'countries-states-cities-database',
    ref: branch
  })
  const downloader = new Downloader({
    url: response.url,
    directory: './',
    httpsAgent: https,
    fileName,
    cloneFiles: false
  })
  await downloader.download()
  spinner.succeed(`Downloaded from branch: ${branch}`)
  spinner.start('Extracting...')
  const tempOutputPath = path.resolve('temp')
  await extract(fileName, { dir: tempOutputPath })
  spinner.succeed()
  spinner.start('Cleaning JSON...')
  const nestedPath = fs.readdirSync(path.resolve(tempOutputPath))[0]

  const inputPath = path.resolve(tempOutputPath, nestedPath, 'countries+states.json')
  const outputPath = path.resolve('src', 'assets', 'json', 'countries-states.json')

  let json = fs.readJsonSync(inputPath)
  // const countryKeys = ['name', 'iso3', 'iso2', 'phone_code', 'region', 'emoji'];
  const countryKeys = ['name', 'iso2', 'emoji', 'states', 'currency', 'currency_name', 'currency_symbol']
  const stateKeys = ['name', 'state_code']
  json = json
    .filter((country) => isSupportedCountry(country.iso2))
    .map((country) => ({
      ...lodash.pick(country, ...countryKeys),
      states: country.states.map((state) => lodash.pick(state, ...stateKeys))
    }))
  fs.writeJsonSync(outputPath, json, {
    // spaces: 4,
  })
  spinner.succeed()
  spinner.start('Cleaning temp dir...')
  rimraf.sync(tempOutputPath)
  rimraf.sync(fileName)
  spinner.succeed()
}

download()
