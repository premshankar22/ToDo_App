const { nanoid } = require("nanoid");

const generateTaskId = () => {

  const time = Date.now().toString(36).toUpperCase();

  const random = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase();

  const nano = nanoid(4).toUpperCase();

  return `TSK-${time}-${nano}${random}`;
};

module.exports = generateTaskId;