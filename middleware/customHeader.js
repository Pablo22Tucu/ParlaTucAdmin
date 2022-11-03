//personalizar y filtrar las consultas
const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    console.log(req.headers)
    if (apiKey === 'pablo-01') {
      next()
    }else{
      res.status(403)
      res.send({error: "API Key no es correcta"})
    }
  } catch (error) {
    res.status(403)
    res.send({error: "Algo ocurrio en el Custom Header"})
  }
}
export default customHeader