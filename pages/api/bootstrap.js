import bootstrap from '../../bin/bootstrap-ceramic'

const Bootstrap = async (req, res) => {
  await bootstrap()
  res.statusCode = 200
  res.end()
}

export default Bootstrap
