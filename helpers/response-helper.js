module.exports = {
  not_found: (res) => {
    return res.status(404).json({error: 'Not found'})
  },

  body_missing: (res) => {
    res.status(500).json({error: 'Request Body is missing'})
  },

  userid_too_long: (res) => {
    return res.status(500).json({error: 'userid can only be 18 characters long'})
  },

  not_sufficient: (res, property) => {
    return res.status(500).json({error: 'user has not enough' + property})
  },

  success: (res, object) => {
    return res.status(200).json(object)
  },

  property_required: (res, property) => {
    return res.status(400).json({error: 'Property ' + property + ' required'})
  }
}
