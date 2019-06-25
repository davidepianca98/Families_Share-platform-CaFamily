const express = require('express')
const router = new express.Router()
const moment = require('moment')

// const Profile = require('../models/profile')
const Group = require('../models/group')
const Member = require('../models/member')
const User = require('../models/user')
// const Parent = require('../models/parent')
const Child = require('../models/child')
// const Announcement = require('../models/announcement')
const Activity = require('../models/activity')
const Rating = require('../models/rating')

router.get('/analytics', async (req, res, next) => {
  if (!req.user_id) { return res.status(401).send('Not authenticated') }
  try {
    const user = await User.findOne({ user_id: req.user_id })
    if (user.role !== 'manager') {
      return res.status(401).send('Unauthorized')
    }
    const users = await User.find({}).lean()
    const totalNumberOfUsers = users.length
    const totalNumberOfGoogleSignups = users.filter(user => user.provider === 'google').length
    const totalNumberOfPlatformSignups = totalNumberOfUsers - totalNumberOfGoogleSignups
    const totalNumberOfChildren = await Child.estimatedDocumentCount({})
    const totalNumberOfGroups = await Group.estimatedDocumentCount({})
    const totalNumberOfGroupMembers = await Member.estimatedDocumentCount({ group_accepted: true, user_accepted: true })
    const totalNumberOfActivities = await Activity.estimatedDocumentCount({})
    let averageNumberOfMembersPerGroup = 0
    let averageNumberOfActivitiesPerGroup = 0
    let newUsers = 0
    let communityGrowth = 0
    users.forEach(user => {
      if (moment().diff(moment(user.createdAt), 'months', true) < 1) newUsers++
    })
    if (totalNumberOfUsers - newUsers !== 0) {
      communityGrowth = ((totalNumberOfUsers - newUsers) / totalNumberOfUsers) * 100
    } else {
      communityGrowth = 100 * newUsers
    }
    if (totalNumberOfGroups !== 0) {
      averageNumberOfMembersPerGroup = Math.floor(totalNumberOfGroupMembers / totalNumberOfGroups)
      averageNumberOfActivitiesPerGroup = Math.floor(totalNumberOfActivities / totalNumberOfGroups)
    }
    let averageAppRating = await Rating.aggregate([
      { '$group':
          {
            '_id': null,
            'avg': {
              '$avg': '$rating'
            }
          }
      }
    ])
    const response = {
      totalNumberOfUsers,
      totalNumberOfGroups,
      averageNumberOfMembersPerGroup,
      averageNumberOfActivitiesPerGroup,
      totalNumberOfChildren,
      totalNumberOfGoogleSignups,
      totalNumberOfPlatformSignups,
      communityGrowth,
      averageAppRating: Number.parseFloat(averageAppRating[0].avg).toFixed(1)
    }
    res.status(200).send(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router