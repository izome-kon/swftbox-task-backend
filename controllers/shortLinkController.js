const shortid = require('shortid');
const ShortLinkModel = require('../models/shortLink.model');
const VisitorModel = require('../models/visitor.model');
exports.encodeURL = async (req, res) => {
  try {
    const shortPath = shortid.generate()
    await ShortLinkModel.create({
      fullUrl: req.body.fullUrl,
      shortPath: shortPath
    })
    return res.status(201)
      .json({ status: true, message: 'Created successfuly!', data: { shortPath, "fullUrl": req.body.fullUrl, date: Date.now() } })
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ status: false, message: errors });
    }
    res.status(500).send("Something went wrong");
  }
}
exports.decodeURL = async (req, res) => {
  const newVisitor = await VisitorModel.create({})
  const shortPath = await ShortLinkModel.findOneAndUpdate({ shortPath: req.query.shortPath }, {
    $push: { visitors: newVisitor._id }
  }, {
    new: true, useFindAndModify: false
  })
  if (shortPath == null) return res.status(404).send({ status: false, message: `this shortPath "${req.query.shortPath}" is Not Found!` })
  return res.status(200).json({ status: true, data: { fullUrl: shortPath.fullUrl } })
}

exports.statisticURL = async (req, res) => {
  const shortPath = await ShortLinkModel.findOne({ shortPath: req.params.urlPath }).populate('visitors')

  if (shortPath == null) return res.status(404).json({ status: false, message: 'this shortPath is Not Found!' })

  return res.status(200).json({ status: true, data: shortPath })
}