-Create user db.createUser({user:"yash",pwd:"tynybay", roles: ["readWrite"]})

-Get users list db.getUsers()

-Get single user db.getUser("tiny")

-Update user db.updateUser("tiny", {roles: ["read"] , customData: {ssn: 0121}})

-Delete User db.dropUser("tiny")