const common = require('../common');

const { server } = common;
const { chai } = common;

const User = require('../../src/models/user');
const Group = require('../../src/models/group');
const Notification = require('../../src/models/notification');

// describe("/Get/groups/id/notifications", () => {
//   it("it should fetch a groups notifications when use is authenticated and group member", async () => {
// 		const user = await User.findOne({ email: "test@email.com" });
// 		console.log(user.user_id)
// 		const group = await Group.findOne({ name: "Test Group Edit" });
//     const notification = {
//       owner_type: "group",
//       owner_id: group.group_id,
//       type: "group",
//       code: 2,
//       subject: "",
//       object: "",
//       read: false
//     };
//     await Notification.create(notification);
//     chai
//       .request(server)
//       .get(`/groups/${group.group_id}/notifications`)
// 			.set("Authorization", user.token)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array").with.lengthOf(1);
//       });
//   });
// });